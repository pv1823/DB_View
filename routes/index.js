const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./passwordUtils').genPassword;
const path = require('path');
var sequelize = require("../repo/sequelize");
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;


// -------------- POST ROUTES ----------------

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '../public/html/page_1.html' }));

 router.post('/register', (req, res, next) => {
    const newUser = new User({
        userId: req.body.uname,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });


 // -------------- GET ROUTES ----------------
 

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/html/login1.html'))
});

// When you visit http://localhost:3000/login, you will see "Login Page"
/*router.get('/login', (req, res, next) => {
   
    res.sendFile(path.join(__dirname, '../public/html/login1.html'))

});*/

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../public/html/signup.html'))
    
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;

