var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info(res.__('hello.world'));
  res.render('index', { 
    title: METADATA.name 
  });
});

module.exports = router;
