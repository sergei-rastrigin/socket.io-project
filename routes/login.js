module.exports = (router, app) => {
    let passport = require('passport');

    router.get('/login', function(req, res) {
        res.render('login', {
            user: req.user
        });
    });

    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });
    
    app.use('/login', router);
}
