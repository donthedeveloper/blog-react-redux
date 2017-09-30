const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post} = require('../models');
const {User} = require('../models');




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     }, 
//     function(email, password, done) {
//         User.findOne({
//             email: email
//         }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }

//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }

//             if (!user.validPassword(password)) {
//                 return (done(null, false, { message: 'Incorrect password.' }))
//             }

//             return done(null, user);
//         })
//     }
// ));




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

router.get('/admin*', (req,res) => {
    res.render('admin');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/', 
        failureRedirect: '/login', 
        failureFlash: true
    }));

router.get('/:postSlug', (req, res) => {
    Post.findOne({
        where: {
            slug: req.params.postSlug
        }, 
        // attributes: ['title', 'markedContent']
    })
    .then((post) => {
        if (post) {
            console.log(post.get('markedContent'));
            // post.markedContent = post.get('markedContent');
            res.render('pages/post', { post: post});
        } else {
            res.send('where da post at!?');
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

module.exports = router;