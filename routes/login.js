var express = require("express");
var router = express.Router();
var passport = require('passport');
var path = require('path');

/* Show login page */
router.get("/", function (req, res, next) {
    passport.authenticate('local', { successRedirect: '/viewTable', failureRedirect: '/login' });
    res.sendFile(path.resolve(__dirname, '../public/html/login.html'));
});

module.exports = router;