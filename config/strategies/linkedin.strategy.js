var passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    // Use linkedin strategy
    passport.use(new LinkedInStrategy({
            consumerKey: 'L0UjjxtTdUz7pRZ82xRRUDUmV4pKGcnsm0_VpDmIbjUEqDLZke1wmp4vW-RhONqd',
            consumerSecret: '5I5WTu3B7KxpRjocgBBwM_1elJVg08rWF-dbuQJvRunEEcePAH8D41jAqE5wAQxY',
            callbackURL: 'http://localhost:3000/auth/linkedin/callback',
            passReqToCallback: true,
            profileFields: ['id', 'first-name', 'last-name', 'email-address']
        },
        function (req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'linkedin',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            var searchMainProviderIdentifierField = 'providerData.' +
                providerUserProfile.providerIdentifierField;
            // Define main provider search query
            var query = {};
            query.provider = providerUserProfile.provider;
            query[searchMainProviderIdentifierField] =
                providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

            User.findOne(query, function (err, user) {

                if (user) {
                    console.log('User Exists Already');
                    done(null, user);
                } else {
                    console.log('new user');
                    var newUser = new User(providerUserProfile);
                    newUser.save(function (err, user) {
                        console.log('err: ' + err);
                        console.log('user saved' + user._id);
                        done(null, user);
                    });
                }
            });
        }
    ));
};
