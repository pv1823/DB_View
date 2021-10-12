var express = require('express');
var crypto = require('crypto');
var sequelize = require('./config');
var router = express.Router();

router.get('/new', function (req, res, next) {
  res.redirect('/signup');
});

router.post('/', function (req, res, next) {
  var salt = crypto.randomBytes(16);

  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
    if (err) { return next(err); }

    var newUsername = req.body.username;
    var newPassword = hashedPassword;
    var newName = req.body.name;
    var newUserQuery = `INSERT INTO users (username, hashed_password, salt, name) VALUES (?,?,?,?)`;
    var result = '';
    try { result = sequelize.query(newUserQuery, {
      type: sequelize.QueryTypes.INSERT,
      replacements: [newUsername, newPassword, salt, newName]
    }); }
    catch (err) { if (err) { return next(err); } }

    var user = {
      id: this.lastID,
      username: req.body.username,
      displayName: req.body.name
    };
    req.login(user, function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    });

  });
});

module.exports = router;