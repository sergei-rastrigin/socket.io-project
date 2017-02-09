const express = require('express');
const authRouter = express.Router();
const userController = require('../controllers/userController')();

authRouter
    .route('/registration')
    .get(userController.get.registration)
    .post(userController.post.registration);

authRouter
    .route('/login')
    .get(userController.get.login)
    .post(userController.post.login);

module.exports = authRouter;