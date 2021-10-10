const { QueryTypes, Sequelize } = require('sequelize');
var LocalStrategy = require('passport-local').Strategy;
var sequelize = new Sequelize(null, null, '', {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite database path
    storage: 'db_view.sqlite'
});

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    connection.query("select * from users where id = " + id, function (err, rows) {
        done(err, rows[0]);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, userId, password, done) {
        var users;
        try{
            users = await sequelize.query('select * from users where userId=?',
            {
                replacements: 'userId',
                type: QueryTypes.SELECT
            });

            if (users.length) 
                return done(null, false, req.flash('signupMessage', 'The given username is already taken.'));
            else {
                var newUser = await sequelize.query('insert into users(userId, password, status) values(?,?)',
                { replacements: [userId, password, 'ACTIVE'], type: QueryTypes.INSERT });

                return done(null, newUser);
            }
        } catch(err) {
            if (err) return done(err)
        }

    }
));

passport.use('local-login', new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, userId, password, done) {
        var users;
        console.log('inside local-login');
        try{
            users = await sequelize.query('select * from users where userId=?',
            { replacements: 'userId', type: QueryTypes.SELECT });

            if (!users.length) 
                return done(null, false, req.flash('loginMessage', 'No user found with the given username.'));
            
            if (!users[0].password == password)
                return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
            return done(null, users[0]);
        } catch(err) {
            if (err) return done(err);
        }
    }
));
