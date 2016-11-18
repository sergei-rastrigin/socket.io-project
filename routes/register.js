module.exports = (router, app) => {
    let passport = require('passport');
    var Account = require('../models/account');

    router.get('/register', function(req, res) {
        res.render('register', {});
    });

    router.post('/register', function(req, res) {
        Account.register(new Account({
            username: req.body.username
        }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', {
                    account: account
                });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        });
    });
    
    app.use('/register', router);
}
