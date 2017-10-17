const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post, User, Subscriber, Category} = require('../models');

router.use('/api', apiRouter);

router.get('/', (req,res) => {
    console.log('session:', req.session);

    Post.findAll({
        order: [['id', 'ASC']], 
        // attributes: ['title', 'intro_paragraph', 'content', 'slug']
    })
    .then((posts) => {
        res.render('pages/posts', { posts: posts });
    })
    .catch((err) => {
        console.error(err);
    })
});

router.post('/', (req, res) => {
    Subscriber.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            email: req.body.email
        }
    })
    .then((subscriber) => {
        if (subscriber[1]) {
            // res.sendStatus(200);

            // TODO: CREATE CATCHALL ROUTE ON INDEX THAT ALWAYS GETS POSTS AND PASSES DATA
            Post.findAll({
                order: [['id', 'ASC']], 
                // attributes: ['title', 'intro_paragraph', 'content', 'slug']
            })
            .then((posts) => {
                res.render('pages/posts', { 
                    posts: posts, 
                    successMessage: 'You are now subscribed for updates!', 
                    errorMessage: null
                });
            })
            .catch((err) => {
                console.error(err);
            });

        } else {
            // res.sendStatus(409); // email taken already
            Post.findAll({
                order: [['id', 'ASC']], 
                // attributes: ['title', 'intro_paragraph', 'content', 'slug']
            })
            .then((posts) => {
                res.render('pages/posts', { 
                    posts: posts, 
                    successMessage: null, 
                    errorMessage: 'Email is already signed up.'
                });
            })
            .catch((err) => {
                console.error(err);
            });
        }
    })
    .catch((err) => {
        // res.sendStatus(400); // invalid email
        Post.findAll({
            order: [['id', 'ASC']], 
            // attributes: ['title', 'intro_paragraph', 'content', 'slug']
        })
        .then((posts) => {
            res.render('pages/posts', { 
                posts: posts, 
                successMessage: null, 
                errorMessage: 'Invalid Email.'
            });
        })
        .catch((err) => {
            console.error(err);
        });
    });
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
    
            // req.session.user = user.dataValues;
            req.session.user = {
                id: user.id, 
                roleId: user.roleId
            };
            // delete req.session.user.password;
    
            res.redirect('/');
        } else {
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
        res.render('pages/signup', {
            errorMessage: 'Please choose a password.'
        });
        return;
    }

    // TODO: EDIT BELOW
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
            // TODO
            console.log('i dont know');
        }
      })
      .catch((err) => {
        // TODO
        let errorMessage = 'Please contact the admin.';

        try {
            errorMessage = err.errors[0].message;
        } catch(e) {
            console.error(e);
        }

        res.render('pages/signup', {
            errorMessage: errorMessage
        });
      })
});

router.get('/:category', (req, res) => {
    Category.findAll()
    .then((categories) => {
        const matchedCategory = categories.find(category => category.name === req.params.category);

        Post.findAll({
            where: {
                categoryId: matchedCategory.id
            }, 
            order: [['id', 'ASC']], 
            // attributes: ['title', 'intro_paragraph', 'content', 'slug']
        })
        .then((posts) => {
            res.render('pages/posts', { 
                posts, 
                categories, 
                matchedCategory: {
                    id: matchedCategory.id, 
                    name: matchedCategory.name
                }, 
                // currentCategoryId: category.id
            });
        })
        .catch((err) => {
            console.error(err);
        })
    })
    .catch((err) => {
        console.error(err);
    })
});

router.get('/:category/:postSlug', (req, res) => {
    Category.findAll()
    .then((categories) => {
        const matchedCategory = categories.find(category => category.name === req.params.category);

        Post.findOne({
            where: {
                slug: req.params.postSlug
            }, 
        })
        .then((post) => {
            if (post) {
                res.render('pages/post', { 
                    post, 
                    categories, 
                    matchedCategory: {
                        id: matchedCategory.id, 
                        name: matchedCategory.name
                    }
                });
            } else {
                res.send('where da post at!?');
            }
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .catch((err) => {
        console.error(err);
    });
});

router.get('/:postSlug', (req, res) => {
    // console.log('post slug');
    Post.findOne({
        where: {
            slug: req.params.postSlug
        }, 
    })
    .then((post) => {
        if (post) {
            res.render('pages/post', { post: post});
        } else {
            res.send('where da post at!?');
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

// router.post('/:postSlug', (req, res) => {
//     Subscriber.findOrCreate({
//         where: {
//             email: req.body.email
//         },
//         defaults: {
//             email: req.body.email
//         }
//     })
//     .then((subscriber) => {
//         if (subscriber[1]) {
//             // res.sendStatus(200);

//             // TODO: CREATE CATCHALL ROUTE ON INDEX THAT ALWAYS GETS POSTS AND PASSES DATA
//             Post.findOne({
//                 where: {
//                     slug: req.params.postSlug
//                 }, 
//                 // attributes: ['title', 'markedContent']
//             })
//             .then((post) => {
//                 if (post) {
//                     res.render('pages/post', { 
//                         post: post, 
//                         successMessage: 'You are now subscribed for updates!', 
//                         errorMessage: null
//                     });
//                 } else {
//                     res.send('where da post at!?');
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//         } else {
//             // res.sendStatus(409); // email taken already
//             Post.findOne({
//                 where: {
//                     slug: req.params.postSlug
//                 }, 
//                 // attributes: ['title', 'markedContent']
//             })
//             .then((post) => {
//                 if (post) {
//                     res.render('pages/post', { 
//                         post: post, 
//                         successMessage: null, 
//                         errorMessage: 'Email is already signed up.'
//                     });
//                 } else {
//                     res.send('where da post at!?');
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });

//         }
//     })
//     .catch((err) => {
//         // res.sendStatus(400); // invalid email
//         Post.findOne({
//             where: {
//                 slug: req.params.postSlug
//             }, 
//             // attributes: ['title', 'markedContent']
//         })
//         .then((post) => {
//             if (post) {
//                 res.render('pages/post', { 
//                     post: post, 
//                     successMessage: null, 
//                     errorMessage: 'Invalid email.'
//                 });
//             } else {
//                 res.send('where da post at!?');
//             }
//         })
//         .catch((err) => {
//             console.error(err);
//         });
//     });
// });

module.exports = router;