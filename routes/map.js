var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('test02', {title: 'The Map'});
});

module.exports = router;
