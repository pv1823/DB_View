var express = require("express");
var router = express.Router();
var db = require("../repo/db");
var path = require('path');
/* GET home page. */
router.get("/", function (req, res, next) {

    db.all("SELECT name FROM sqlite_schema WHERE type = 'table' or type = 'view'", (err, row) => {
    console.log(row);
    /*res.json({
        status : 'SUCESS',
        message : 'List of all tables in DB',
        data : row
      });*/
      res.render('db_view',{ data : row});
  });
});

module.exports = router;
