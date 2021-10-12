var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();
require('./auth-init')();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.redirect('/login');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
