const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post, Subscriber} = require('../models');

router.use('/api', apiRouter);

router.get('/', (req,res) => {
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
    res.render('admin');
});

router.get('/:postSlug', (req, res) => {
    Post.findOne({
        where: {
            slug: req.params.postSlug
        }, 
        // attributes: ['title', 'markedContent']
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

router.post('/:postSlug', (req, res) => {
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
            Post.findOne({
                where: {
                    slug: req.params.postSlug
                }, 
                // attributes: ['title', 'markedContent']
            })
            .then((post) => {
                if (post) {
                    res.render('pages/post', { 
                        post: post, 
                        successMessage: 'You are now subscribed for updates!', 
                        errorMessage: null
                    });
                } else {
                    res.send('where da post at!?');
                }
            })
            .catch((err) => {
                console.error(err);
            });
        } else {
            // res.sendStatus(409); // email taken already
            Post.findOne({
                where: {
                    slug: req.params.postSlug
                }, 
                // attributes: ['title', 'markedContent']
            })
            .then((post) => {
                if (post) {
                    res.render('pages/post', { 
                        post: post, 
                        successMessage: null, 
                        errorMessage: 'Email is already signed up.'
                    });
                } else {
                    res.send('where da post at!?');
                }
            })
            .catch((err) => {
                console.error(err);
            });

        }
    })
    .catch((err) => {
        // res.sendStatus(400); // invalid email
        Post.findOne({
            where: {
                slug: req.params.postSlug
            }, 
            // attributes: ['title', 'markedContent']
        })
        .then((post) => {
            if (post) {
                res.render('pages/post', { 
                    post: post, 
                    successMessage: null, 
                    errorMessage: 'Invalid email.'
                });
            } else {
                res.send('where da post at!?');
            }
        })
        .catch((err) => {
            console.error(err);
        });
    });
})

module.exports = router;