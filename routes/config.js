var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, '', {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite database path
    storage: 'db_view.sqlite'
  });

module.exports = sequelize;