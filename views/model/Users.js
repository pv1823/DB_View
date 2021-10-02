var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db_view.sqlite'
});

var Users = sequelize.define('Users', {
    id: {type: Sequelize.INTEGER, field: 'id'},
    userId: {type: Sequelize.STRING, field: 'userId'},
    password: {type: Sequelize.STRING, field: 'password'},
    status: {type: Sequelize.STRING, field: 'status'},
    createdDate: {type: Sequelize.DATE, field: 'createdDate'},
    updatedDate: {type: Sequelize.DATE, field: 'updatedDate'},
    createdBy: {type: Sequelize.STRING, field: 'createdBy'},
},{
    freezeTableName: true // Model tableName will be the same as the model name
  });