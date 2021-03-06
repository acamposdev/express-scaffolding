// Globals
METADATA = require('./package.json');
logger = require('./vendors/winston');
//var logger = require('morgan');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

// ORM middleware
var models = require('./vendors/sequelize').models;

// I18n utility
var i18n = require('./vendors/i18n');

// Routes install
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// call socket.io to the app
app.io = require('socket.io')();
var io = require('./controllers/socket.controller')(app.io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// Allow session and locals in views
app.use(function (req, res, next) {
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  res.locals.title = METADATA.name;
  next();
});

app.use(i18n);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
