module.exports = function(app) {
    let router = require('express').Router();
    let home = require('./home')(router,app);
    let login = require('./login')(router,app);
    let register = require('./register')(router,app);
    let logout = require('./logout')(router,app);
};
