var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/testproxy', function(req, res, next) {
  res.send('Test Done!');
});

module.exports = router;
