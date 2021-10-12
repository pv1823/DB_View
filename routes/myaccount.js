var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var sequelize = require('./config');

var router = express.Router();

/* GET users listing. */
router.get('/',
  ensureLoggedIn(),
  async function(req, res, next) {
    var userQuery = `SELECT rowid AS id, username, name FROM users WHERE rowid = ${req.user.id}`;
    var users = await sequelize.query(userQuery);
    var output = {
        id: users?.id.toString(),
        username: users?.username,
        displayName: users?.name
    };

    res.render('viewTable', { user: output });
  });

module.exports = router;
