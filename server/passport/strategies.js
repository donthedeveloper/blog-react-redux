passport.use(new LocalStrategy({
    usernameField: 'email'
}, 
function(email, password, done) {
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password)) {
            return (done(null, false, { message: 'Incorrect password.' }))
        }

        return done(null, user);
    })
}
));