module.exports = (router, app) => {

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use('/logout', router);
}
