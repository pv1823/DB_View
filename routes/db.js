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

/* update table. */
router.post("/table/update/:tableName/:field/:id", function (req, res, next) {
  var tableName = req.params.tableName;
  var id = req.params.id;
  var field = req.params.field;
  var newValue = req.body.newValue;
  var data = [];
  var query = `UPDATE ${tableName} SET ${field}='${newValue}' WHERE id=${id};`;
  console.log("Query: " + query);
  
  try {
    db.run(query, data, (err) => {
      if (err) {
        console.error(err.message);
        res.send({'status': 'FAILURE', 'message': 'Db Update failed.'})
      } else {
        var msg = `Updated ${tableName}. New value=${newValue} for Id=${id}`;
        res.send({'status': 'SUCCESS', 'message': msg})
      }
    });
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
  }
});

/* create table. */
router.post("/table/create", function (req, res, next) {
  var newValue = req.body.sqlQuery;
  var data = [];
  console.log("Query: " + sqlQuery);
  
  try {
    db.run(sqlQuery, data, (err) => {
      if (err) {
        console.error(err.message);
        res.send({'status': 'FAILURE', 'message': 'Table creation failed'})
      } else {
        var msg = `Created table successfully`;
        res.send({'status': 'SUCCESS', 'message': msg})
      }
    });
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
  }
});

/* delete rows in the table. */
router.delete("/table/delete/:tableName/:id", function (req, res, next) {
  var id = req.params.id;
  var tableName = req.params.tableName;
  var sqlQuery = `DELETE FROM ${tableName} WHERE id=${id}`;
  var data = [];
  console.log("Query: " + sqlQuery);
  
  try {
    db.run(sqlQuery, data, (err) => {
      if (err) {
        console.error(err.message);
        res.send({'status': 'FAILURE', 'message': 'Row Deletion failed.'})
      } else {
        var msg = `Deleted row with id ${id} successfully`;
        res.send({'status': 'SUCCESS', 'message': msg})
      }
    });
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
  }
});

module.exports = router;