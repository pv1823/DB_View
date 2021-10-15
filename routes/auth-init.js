var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');
var sequelize = require('./config');


module.exports = function() {

  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy(async function(username, password, cb) {
    var userQuery = `SELECT rowid AS id, * FROM users WHERE username = '${username}'`;
    var userRow = await sequelize.query(userQuery);
    var user = userRow[0];
    console.log("User Object at auth-init: " + JSON.stringify(user));
    if (!user[0]) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    
    crypto.pbkdf2(password, user[0].salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }
    if (!crypto.timingSafeEqual(user[0].hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
            
    var userObj = {
        id: user[0].id.toString(),
        username: user[0].username,
        displayName: user[0].name
    };
        return cb(null, userObj);
  });
}));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

};