var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req);
  res.render('index', { title: 'Express',
  						user: req.user });
});

module.exports = router;
