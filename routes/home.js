module.exports = function(router, app) {

    router.get('/', (req, res) => {
        if (!req.user) {
            res.redirect('/login');
        }
        else {
            res.render('index', {
                user: req.user
            });
        }
    });

    app.use('/', router);
}
