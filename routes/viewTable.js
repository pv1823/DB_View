var express = require('express');
var router = express.Router();
var path = require('path');

//app.use(express.static(path.join(__dirname + '../public/html')));
/* Display Table Content from DB. */
const ensureAuthenticated = (req, res, next) => {
  console.log("Request Authenticated: " + req?.isAuthenticated());
  req?.isAuthenticated() ? next() : res.redirect('/login');
}

router.get('/', function(req, res, next) {
  ensureAuthenticated(req, res, next);
  console.log('Inside viewTable Router');
  res.sendFile(path.join(__dirname, '../public/html/viewTable.html')); 
});

module.exports = router;
