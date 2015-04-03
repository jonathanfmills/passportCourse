var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    // Use twitter strategy
    passport.use(
        new TwitterStrategy({
                consumerKey: 'JLfnBWBGUgw2oF2urc5VTA5Nr',
                consumerSecret: '4yGhMunytN6kQQPxp32qtBVqWZbypx63MGyz67R65Y6d30TBLM',
                callbackURL: 'http://localhost:3000/auth/twitter/callback',
                passReqToCallback: true
            },
            function (req, token, tokenSecret, profile, done) {
                // Set the provider data and include tokens
                var providerData = profile._json;
                providerData.token = token;
                providerData.tokenSecret = tokenSecret;

                // Create the user OAuth profile
                var providerUserProfile = {
                    displayName: profile.displayName,
                    username: profile.username,
                    provider: 'twitter',
                    providerIdentifierField: 'id',
                    providerData: providerData
                };

                // Save the user OAuth profile
                var searchMainProviderIdentifierField = 'providerData.' +
                    providerUserProfile.providerIdentifierField;
                // Define main provider search query
                var query = {};
                query.provider = providerUserProfile.provider;
                query[searchMainProviderIdentifierField] =
                providerUserProfile.providerData[providerUserProfile.providerIdentifierField];


                console.log(query);

                User.findOne(query, function (err, user) {
                    if (user) {
                        console.log('User Exists Already');
                        done(null, user);
                    } else {
                        console.log('new user');
                        var newUser = new User(providerUserProfile);
                        newUser.save(function (err, user) {
                            console.log('err: ' + err);
                            console.log('user saved' + newUser._id);
                            done(null, newUser);
                        });
                    }
                });
            }
        ));
};
