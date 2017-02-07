const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();

authRouter
    .route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        const dbConfig = require('../config/db.json');
        const dbURL = dbConfig.dbURL;
        mongoose.connect(dbURL, (err, db) => {
            if (err) {
                throw new Error(err.message);
            }
            let collection = db.collection('users');
            let user = {
                username: req.body.username,
                password: req.body.password
            };

            collection.insert(user, (err, results) => {
                req.login(results, () => {
                    res.redirect('profile');
                })
            });
        });
    });

authRouter
    .route('/profile')
    .get((req, res) => {
        console.log(req.user);
        res.json(req.user);
    })

module.exports = authRouter;

