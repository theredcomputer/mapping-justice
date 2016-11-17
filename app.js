var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Geocode Forward
var MapboxClient = require('mapbox');
var client = new MapboxClient('sk.eyJ1IjoiaGZlbmciLCJhIjoiY2l2aDd6amJtMDFzZTJvcGJtNDVmMTl3MiJ9.qMDLL5QBRs30iVi-xDiVfw');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
//app.use(passport.initialize());
//app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);
//var flash = require('connect-flash');


//var routes = require('./routes/index')(passport);
//var users = require('./routes/users');
//var map = require('./routes/map');


//var dbConfig = require('./db');
//var mongoose = require('mongoose');
// Connect to DB
//mongoose.connect(dbConfig.url);


//var app = express();.static(path.join(__dirname, 'public')));

//

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var routes = require('./routes/index')(passport);
var users = require('./routes/users');
var map = require('./routes/map');
var upload = require('./routes/upload');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

app.use('/', routes);
app.use('/users', users);
app.use('/map', map);
app.use('/upload',upload);



// Configuring Passport
//var passport = require('passport');
//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
//app.use(passport.initialize());
//app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
//var flash = require('connect-flash');
//app.use(flash());

// Initialize Passport
//var initPassport = require('./passport/init');
//initPassport(passport);

//var routes = require('./routes/index')(passport);
//app.use('/', routes);

/// catch 404 and forward to error handler

//app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
//});

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

var temp1,temp2;


app.get('/address',function(req,res){
  client.geocodeForward('Chester, NJ', function(err, res) {
  // res is the geocoding result as parsed JSON
  temp1 = res.features[0].geometry.coordinates;
  //console.log(temp1);
});
  return res.json(temp1);
});

app.get('/address/:name',function(req,res){

  client.geocodeForward(req.params.name, function(err, res) {
  // res is the geocoding result as parsed JSON
  temp2 = res.features[0].geometry.coordinates;
  

  });
  console.log(temp2);
  setTimeout((function() {res.send(temp2)}), 2000);
  // var feature = {
  // "type": "Feature",
  // "properties": {
  //   "name": "Test Island"
  //   },
  // "geometry": {
  //   "type": "Point",
  //   "coordinates": temp2
  //   }
  // };
  // client.insertFeature(feature, 'civh80y03016b2to6gg7y0zc6', function(err, feature) {
  //     if(!err) {
  //       console.log(feature);
  //       console.log('insert!');
  //     }
  //  });
   
    
});

app.get('/fetch',function(req,res){
   client.listFeatures('civh80y03016b2to6gg7y0zc6', {}, function(err, collection) {
       //console.log(collection);
       var n = collection.features.length;
       console.log(n);
       return res.json(collection.features[21].geometry.coordinates);
   });
});

// var dataset01 = {
//   "name": "foo",
//   "description": "bar"
// };

// client.createDataset({ name: 'foo', description: 'bar' }, function(err, dataset) {

//       console.log(dataset);
//   });

// var feature = {
//   "type": "Feature",
//   "properties": {
//     "name": "Test Island"
//   },
//   "geometry": {
//     "type": "Point",
//     "coordinates": [220, 110]
//   }
// };
// client.insertFeature(feature, 'civh80y03016b2to6gg7y0zc6', function(err, feature) {
//   if(!err) console.log(feature);
// });
// client.deleteDataset('civh2r5eg01tx2op3d83si55q', function(err) {
//   if (!err) console.log('deleted!');
//   console.log(err);
// });
// client.readDataset('civh2r5eg01tx2op3d83si55q', function(err, dataset) {
//   console.log(dataset);
// });

// app.post('/datasets/v1/hfeng49',function(req,res){
    
//     console.log('created!');
// });





module.exports = app;
