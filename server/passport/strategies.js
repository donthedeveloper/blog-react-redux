const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models');

passport.use(new LocalStrategy(
    function(username, password, done) {
        // console.log('local strategy used');
        
        User.findOne({
            where: {
                email: username
            }
        })
        .then((user) => {
            const userDoesNotExist = !user;
            let passwordDoesNotMatch = false;
            if (user) {
                passwordDoesNotMatch = !user.validPassword(password);
            }

            if (userDoesNotExist || passwordDoesNotMatch) {
                const errorMessage = 'Username and password do not match.';
                return done(null, false, { message: errorMessage });
            }

            return done(null, user);
        })
        .catch((err) => {
            return done(err);
        });
    }
));

// // export default {
//     // serializeUser = function(user, done) {
//         passport.serializeUser(function(user, done) {
//             done(null, user.id);
//         })
//     // }, 
//     // deserializeUser = function(id, done) {
//         passport.deserializeUser(function(id, done) {
//             User.findById(id, function(err, user) {
//                 done(err, user);
//             })
//         });
//     // }
// // };