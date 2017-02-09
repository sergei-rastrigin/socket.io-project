const validator = require('email-validator');
const User = require('../models/user');
const passport = require('passport');

let userController = function(req, res, next) {
    function postRegistration(req, res) {
        let isEmailValid = validator.validate(req.body.username);

        if (isEmailValid) {
            User.register(new User({
                    username: req.body.username
                }), req.body.password,
                (err, user) => {
                    if (err) {
                        req.flash('error', err.message);
                        res.redirect('/registration');
                    }

                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/');
                    });
                });
        }
        else {
            req.flash('error', 'your email is not valid');
            res.render('registration');
        }
    }

    function getRegistration(req, res) {
        res.render('registration');
    }

    function getLogin(req, res) {
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.render('login');
        }
    }

    function postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res, next);
    }
    
    function middleware(req, res, next) {
        if (!req.user) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
    
    function getIndex(req, res, next) {
        res.render('index');
    }


    return {
        middleware: middleware,
        get: {
            login: getLogin,
            registration: getRegistration,
            index: getIndex
        },
        post: {
            login: postLogin,
            registration: postRegistration
        }
    }
}

module.exports = userController;
