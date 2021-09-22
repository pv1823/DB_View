var express = require("express");
var router = express.Router();
var db = require("../repo/db");
var path = require('path');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, '', {
  host: 'localhost',
  dialect: 'sqlite',
  // SQLite database path
  storage: 'db_view.sqlite'
});
/* GET home page. */
router.get("/json", function (req, res, next) {

  db.all("SELECT name FROM sqlite_schema WHERE type = 'table' or type = 'view'", (err, row) => {
    res.send(row);
  });
});

/* GET particular table. */
router.get("/table/:tableName/colNames", async function (req, res, next) {
  var tableName = req.params.tableName;
  var tableData, tableCol;
  try {
    tableData = await sequelize.query(`SELECT * FROM ${tableName}`);
    tableCol = await sequelize.query(`SELECT name FROM pragma_table_info('${tableName}')`);
  } catch(err) { console.error(err); }

  res.json({
    "table_name": tableName,
    "table_data":tableData, 
    "table_columns": tableCol
  });
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

/* Add a new row. */
router.post("/table/:tableName", function (req, res, next) {
  var tableName = req.params.tableName;
  var newRowData = req.body;
  Object.keys(newRowData).forEach( (key, index)=>{
    console.log(`${key} - ${key[index]}`);
  });
  /*
  var sqlQuery = `INSERT INTO ${tableName} VALUES (${id},${name}, ${availability}, ${author}, ${price});`;
  var data = [];
  console.log("Query: " + sqlQuery);
  
  try {
    db.run(sqlQuery, data, (err) => {
      if (err) {
        console.error(err.message);
        res.send({'status': 'FAILURE', 'message': 'Row addition failed'})
      } else {
        var msg = `Added the row successfully`;
        res.send({'status': 'SUCCESS', 'message': msg})
      }
    });
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
  }
  */
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

/*Getting the column names dynamically 
router.get("/table/:tableName/colNames", function (req, res) {
  var tableName = req.params.tableName;
});*/

module.exports = router;