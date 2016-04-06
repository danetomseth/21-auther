// 930556164889-nf6q5v7hqaemiqjkb7qrqqel4po0sefg.apps.googleusercontent.com

// cu4Og26Wt4JM1T1MK5a1-Vn2

var router = require('express').Router();
var session = require('express-session');
var User = require('../api/users/user.model');
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
    new GoogleStrategy({
            clientID: '930556164889-nf6q5v7hqaemiqjkb7qrqqel4po0sefg.apps.googleusercontent.com',
            clientSecret: 'cu4Og26Wt4JM1T1MK5a1-Vn2',
            callbackURL: '/auth/google/callback '
        },
        // Google will send back the token and profile
        function(token, refreshToken, profile, done) {
            console.log('---', 'in verification callback', profile, '---');
            passport.serializeUser(function(profile, done) {
        		done(null, profile._id);
    		})
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) return done(err);
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, pass along that user
                } else {
                    // if there is no user found with that google id, create them
                    var newUser = new User();
                    // set all of the Google information in our user model
                    newUser.google.id = profile.id; // set the users google id                   
                    newUser.google.token = token; // we will save the token that google provides to the user                    
                    newUser.google.name = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.google.email = profile.emails[0].value; // Google can return multiple emails so we'll take the first
                    // don't forget to include the user's email, name, and photo
                    newUser.email = newUser.google.email; // required field
                    newUser.name = newUser.google.name; // nice to have
                    newUser.photo = profile.photos[0].value; // nice to have
                    // save our user to the database

                    newUser.save(function(err) {
                        if (err) done(err);
                        // if successful, pass along the new user
                        else done(null, newUser);
                    });
                }
            });
            done();
        })
);

// Google authentication and login 
router.get('/auth/google', passport.authenticate('google', {
    scope: 'email'
}));

// handle the callback after Google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/', // or wherever
        failureRedirect: '/' // or wherever
    })
);

// don't forget to install passport-google-oauth




module.exports = router;