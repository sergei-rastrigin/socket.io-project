let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let passport = require('passport');
let flash = require('express-flash');
let session = require('express-session');
const dbURL = require('./config/db.json').dbURL;
let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(dbURL);
let db = mongoose.connection;

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// init passport settings and strategies
require('./config/passport')(app);

app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth.js'));

/*  error handlers  */

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// subscribing on mongoose events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

module.exports = app;
