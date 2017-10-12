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
    console.log('user session:', req.user);
    console.log('user is authenticated:', req.isAuthenticated());

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

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return res.render('pages/login', {
                errorMessage: 'There was an error.'
            });
        }
        
        if (!user) { 
            return res.render('pages/login', {
                errorMessage: info.message
            }); 
        }

        res.redirect('/');
    })(req, res, next);
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
            res.render('pages/post', { post: post });
        } else {
            res.send('where da post at!?');
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

module.exports = router;