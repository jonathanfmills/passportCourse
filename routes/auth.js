var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google').get(passport.authenticate('google', {
    scope: [
   'https://www.googleapis.com/auth/userinfo.profile',
   'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.route('/twitter').get(passport.authenticate('twitter'));
router.route('/twitter/callback').get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.route('/linkedin').get(passport.authenticate('linkedin'));
router.route('/linkedin/callback').get(passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.route('/facebook').get(passport.authenticate('facebook', {
    scope: ['email']
	}));
router.route('/facebook/callback').get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
module.exports = router;
