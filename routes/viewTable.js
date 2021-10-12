var express = require('express');
var router = express.Router();
var path = require('path');

//app.use(express.static(path.join(__dirname + '../public/html')));
/* Display Table Content from DB. */
router.get('/', function(req, res, next) {
  console.log('Inside viewTable Router');
  res.sendFile(path.join(__dirname, '../public/html/viewTable.html'));
});

module.exports = router;
