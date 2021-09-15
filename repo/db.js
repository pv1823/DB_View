const sqlite = require('sqlite3');
var DBFILE = 'db_view.sqlite';
var db = new sqlite.Database(DBFILE);

module.exports = db;