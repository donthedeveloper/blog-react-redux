const passport = require('passport');
const {User} = require('../models');

export default {
    serializeUser = function(user, done) {
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        })
    }, 
    deserializeUser = function(id, done) {
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            })
        });
    }
};