var express = require("express");
var router = express.Router();
var db = require("../repo/db");
var path = require('path');
/* GET home page. */
router.get("/", function (req, res, next) {

  db.all("SELECT name FROM sqlite_schema WHERE type = 'table' or type = 'view'", (err, row) => {
    res.render('db_view', { data: row });
  });
});

router.get("/json", function (req, res, next) {

  db.all("SELECT name FROM sqlite_schema WHERE type = 'table' or type = 'view'", (err, row) => {
    res.send(row);
  });
});

/* GET particular table. */
router.get("/table/:tableName", function (req, res, next) {
  var tableName = req.params.tableName;
  try {
    db.all(`SELECT * FROM ${tableName} `, (err, row) => {
      if (err) {
        console.error('ERROR: Invalid table name received.');
        res.send({ 'status': 'FAILURE', 'message': 'Check the table name' });
      }
      else {
        res.send(row);
      }
    });
  } catch (err) {
    console.error('ERROR: Invalid table name received.');
  }
});

module.exports = router;