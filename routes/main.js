const mainRouter = require('express').Router();

mainRouter
    .route('/')
    .get((req, res) => {
        res.render('index');
    });
    
module.exports = mainRouter;