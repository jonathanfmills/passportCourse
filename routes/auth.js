var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.route('/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));

router.get('/google/callback',passport.authenticate('google', 
									{ successRedirect: '/',
                                      failureRedirect: '/login' }));


module.exports = router;
