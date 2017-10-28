const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post, User, Subscriber, Category} = require('../models');

router.use('/api', apiRouter);

router.get('/', async (req,res) => {
    // console.log('session:', req.session);

    try {
        const categories = await Category.findAll();
        const posts = await Post.findAll({ order: [['id', 'ASC']] });

        res.status(200);
        res.render('pages/posts', { 
            posts: posts, 
            categories, categories 
        });
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        const posts = await Post.findAll({ order: [['id', 'ASC']] });

        try {
            const subscriber = await Subscriber.findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    email: req.body.email
                }
            });
            
            const newSubscriber = subscriber[1];
            if (newSubscriber) {
                res.status(201);
                res.render('pages/posts', { 
                    posts: posts, 
                    categories: categories, 
                    successMessage: 'You are now subscribed for updates!', 
                    errorMessage: null
                });
            } else {
                res.status(422);
                res.render('pages/posts', { 
                    posts: posts, 
                    categories: categories, 
                    successMessage: null, 
                    errorMessage: 'Email is already signed up.'
                });
            }
        } catch(err) {
            res.status(400);
            res.render('pages/posts', { 
                posts: posts, 
                categories: categories, 
                successMessage: null, 
                errorMessage: 'Invalid Email.'
            });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/admin*', (req,res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.user.roleId !== 2) {
        return res.redirect('/login');
    }
    res.render('admin');
});

router.get('/login', (req, res) => {
    res.status(200);
    res.render('pages/login');
});

router.post('/login', function(req, res, next) {
    User.findOne({
        where: {
          email: req.body.username
        }
      })
      .then((user) => {
        // validated plain password with encrypted password
        if (user && user.validPassword(req.body.password)) {
            req.session.user = {
                id: user.id, 
                roleId: user.roleId
            };
            res.redirect('/');
        } else {
            res.status(401);
            res.render('pages/login', { errorMessage: 'Invalid username or password.'} );
        }
    
      })
      .catch((err) => {
        return res.render('pages/login', {
            errorMessage: err.message
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/login');
});

router.get('/signup', (req, res) => {
    res.render('pages/signup');
});

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    // validation here because of lack of custom error message support in sequelize for required fields
    if (!password) {
        res.status(400)
        res.render('pages/signup', {
            errorMessage: 'Please choose a password.'
        });
        return;
    }

    User.create({
        email: email,
        password: password || null,
        first_name: firstName,
        last_name: lastName,
        roleId: 1
      })
      .then((user) => {
        if (user) {
            req.session.user = {
                id: user.id, 
                roleId: user.roleId
            };

            res.redirect('/');
        } else {
            res.sendStatus(500);
        }
      })
      .catch((err) => {
        let errorMessage = 'Please contact the admin.';

        try {
            errorMessage = err.errors[0].message;
        } catch(err) {
            console.error(err);
        }

        res.status(400);
        res.render('pages/signup', {
            errorMessage: errorMessage
        });
      })
});

router.get('/:category', async (req, res) => {
    try {
        const categories = await Category.findAll();
        const matchedCategory = categories.find(category => category.name === req.params.category);

        if (!matchedCategory) { return res.sendStatus(404) }

        const posts = await Post.findAll({ 
            where: {
                categoryId: matchedCategory.id
            }, 
            order: [['id', 'ASC']] 
        });

        res.status(200);
        res.render('pages/posts', { 
            posts: posts, 
            categories, 
            matchedCategory: {
                id: matchedCategory.id, 
                name: matchedCategory.name
            }, 
        });
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/:category', async (req, res) => {
    try {
        const categories = await Category.findAll();
        const matchedCategory = categories.find(category => category.name === req.params.category);

        if (!matchedCategory) { return res.sendStatus(404) }
        
        const posts = await Post.findAll({ 
            where: {
                categoryId: matchedCategory.id
            }, 
            order: [['id', 'ASC']] 
        });

        try {
            const subscriber = await Subscriber.findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    email: req.body.email
                }
            });
            
            const newSubscriber = subscriber[1];
            if (newSubscriber) {
                res.status(201);
                res.render('pages/posts', { 
                    posts: posts, 
                    categories: categories, 
                    matchedCategory: {
                        id: matchedCategory.id, 
                        name: matchedCategory.name
                    },
                    successMessage: 'You are now subscribed for updates!', 
                    errorMessage: null
                });
            } else {
                res.status(422);
                res.render('pages/posts', { 
                    posts: posts, 
                    categories: categories, 
                    matchedCategory: {
                        id: matchedCategory.id, 
                        name: matchedCategory.name
                    },
                    successMessage: null, 
                    errorMessage: 'Email is already signed up.'
                });
            }
        } catch(err) {
            res.status(400);
            res.render('pages/posts', { 
                posts: posts, 
                categories: categories, 
                matchedCategory: {
                    id: matchedCategory.id, 
                    name: matchedCategory.name
                },
                successMessage: null, 
                errorMessage: 'Invalid Email.'
            });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/:category/:postSlug', async (req, res) => {
    try {   
        const categories = await Category.findAll();
        const matchedCategory = categories.find(category => category.name === req.params.category);

        const post = await Post.findOne({
            where: {
                slug: req.params.postSlug
            }, 
        });

        if (!matchedCategory || !post) { return res.sendStatus(404) }
        if (post.categoryId !== matchedCategory.id) { return res.sendStatus(404) }


        res.status(200);
        res.render('pages/post', { 
            post, 
            categories, 
            matchedCategory: {
                id: matchedCategory.id, 
                name: matchedCategory.name
            }
        });
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/:category/:postSlug', async (req, res) => {
    try {
        const categories = await Category.findAll();
        const matchedCategory = categories.find(category => category.name === req.params.category);
        
        const post = await Post.findOne({
            where: {
                slug: req.params.postSlug
            }, 
        });

        if (!matchedCategory || !post) { return res.sendStatus(404) }
        if (post.categoryId !== matchedCategory.id) { return res.sendStatus(404) }

        try {
            const subscriber = await Subscriber.findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    email: req.body.email
                }
            });
            
            const newSubscriber = subscriber[1];
            if (newSubscriber) {
                res.status(201);
                res.render('pages/posts', { 
                    post, 
                    categories: categories, 
                    matchedCategory: {
                        id: matchedCategory.id, 
                        name: matchedCategory.name
                    }, 
                    successMessage: 'You are now subscribed for updates!', 
                    errorMessage: null
                });
            } else {
                res.status(422);
                res.render('pages/posts', { 
                    post, 
                    categories: categories, 
                    matchedCategory: {
                        id: matchedCategory.id, 
                        name: matchedCategory.name
                    }, 
                    successMessage: null, 
                    errorMessage: 'Email is already signed up.'
                });
            }
        } catch(err) {
            res.status(400);
            res.render('pages/posts', { 
                post, 
                categories: categories, 
                matchedCategory: {
                    id: matchedCategory.id, 
                    name: matchedCategory.name
                }, 
                successMessage: null, 
                errorMessage: 'Invalid Email.'
            });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;