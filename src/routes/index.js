const mainRouter = require('express').Router();
const userController = require('../controllers/userController')();

mainRouter
    .route('/')
    .all(userController.middleware)
    .get(userController.get.index);
    
module.exports = mainRouter;