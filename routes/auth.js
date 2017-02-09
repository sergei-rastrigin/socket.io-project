const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authRouter = express.Router();
const validator = require('email-validator');

authRouter
    .route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        let isEmailValid = validator.validate(req.body.username);
        
        if (isEmailValid) {
            registerUser(req, res);    
        } else {
            req.flash('error', 'your email is not valid');
            res.render('register');
        }
        
    });
    
function registerUser(req, res) {
    User.register(new User({
                username: req.body.username
            }), req.body.password,
            (err, user) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('register');
                }

                passport.authenticate('local')(req, res, () => {
                    res.redirect('/');
                });
            });
}

authRouter
    .route('/login')
    .get((req, res) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('login');    
        }
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

authRouter
    .route('/profile')
    .get((req, res) => {
        res.json(req.user);
    });

module.exports = authRouter;