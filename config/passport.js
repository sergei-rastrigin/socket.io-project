const passport = require('passport');
let User = require('../models/user');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(User.serializeUser());
    
    passport.deserializeUser(User.deserializeUser());
    
    require('./strategies/local')();
};