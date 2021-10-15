var express = require("express");
var router = express.Router();
var path = require('path');

/* Show login page */
router.get("/", function (req, res, next) {
    console.log("Showing /login page. Authenticated: " + req?.isAuthenticated());
    if (req.isAuthenticated()) {
        res.redirect('/viewTable');
    } else { 
        res.sendFile(path.resolve(__dirname, '../public/html/login.html')); 
    }
});

module.exports = router;