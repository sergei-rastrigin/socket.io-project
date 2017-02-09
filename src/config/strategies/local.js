const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

module.exports = () => {
    passport.use(new LocalStrategy(User.authenticate()));
};