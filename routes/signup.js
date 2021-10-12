var express = require("express");
var router = express.Router();
var path = require('path');

/* Show login page */
router.get("/", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/html/signup.html'));
});

module.exports = router;