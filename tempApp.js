var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Added by Kevin
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var map = require('./routes/map');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Added by Kevin
app.use(session({ secret: 'somepassword' })); //  secret
app.use(passport.initialize());
app.use(passport.session()); // persisten login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', routes);
app.use('/users', users);
app.use('/map', map);




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

// Added by Kevin routes 
require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport
// Added by Kevin launch
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
