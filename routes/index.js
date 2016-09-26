var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.get('/map', function(req, res, next) {
    res.render('map');
});*/

module.exports = router;
