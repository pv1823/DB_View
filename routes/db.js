var express = require("express");
var router = express.Router();
var db = require("../repo/db");
var sequelize = require("../repo/sequelize");
var path = require('path');
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
router.post("/table/:tableName", async function (req, res, next) {
  var tableName = req.params.tableName;
  var sqlQuery = `INSERT INTO ${tableName} VALUES(`, body = req.body;
  Object.keys(body).forEach( (key, index)=> {
    sqlQuery += `'${body[key]}',`;
  });
  sqlQuery = sqlQuery.slice(0, -1);
  sqlQuery += ");";
  console.log("Query: " + sqlQuery);
  
  try {
    var success = await sequelize.query(sqlQuery);
    res.send({"status": "SUCCESS", "message": "Row Inserted Successfully"});
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
    res.send({"status": "FAILURE", "message": "Failed to insert new row. " + err});
  }
  
});

/* create table. */
router.post("/table/create", async function (req, res, next) {
  var createTableQuery = req.body.sqlQuery;

  try {
    await sequelize.query(createTableQuery);
    res.send({"status": "SUCCESS", "message":"Table created successfully."});
  } catch (err) {
    console.error('ERROR: Unable to update table. Check console log');
    res.send({"status": "FAILURE", "message":"Failed to create Table. " + err});
  }
});

/* delete rows in the table. */
router.delete("/table/delete/:tableName/:id", async function (req, res, next) {
  var id = req.params.id;
  var tableName = req.params.tableName;
  var sqlQuery = `DELETE FROM ${tableName} WHERE id='${id}'`;
  var data = [];
  console.log("Query: " + sqlQuery);
  
  try {
    await sequelize.query(sqlQuery);
    res.send({"status": "SUCCESS", "message": "Row Deleted Successfully"});
  } catch (err) {
    console.error('ERROR: Unable to delete row. Check console log');
    res.send({"status": "FAILURE", "message": "Failed to delete row. " + err});
  }
});


module.exports = router;