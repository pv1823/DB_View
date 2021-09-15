var express = require("express");
var router = express.Router();
var db = require("../repo/db");
var path = require('path');
/* GET home page. */
router.get("/", function (req, res, next) {

    db.all("SELECT name FROM sqlite_schema WHERE type = 'table' or type = 'view'", (err, row) => {
      res.render('db_view',{ data : row});
  });
});

/* GET particular table. */
router.get("/table/:tableName", function (req, res, next) {
  var tableName = req.params.tableName;

  db.all(`SELECT * FROM {tableName} `, (err, row) => {
    res.render('db_view',{ data : row, tableData: row});
});
});

module.exports = router;
