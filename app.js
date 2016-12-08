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
});
  return res.json(temp1);
});

app.get('/address/:name',function(req,res){

  client.geocodeForward(req.params.name, function(err, res) {
  // res is the geocoding result as parsed JSON
  temp2 = res.features[0].geometry.coordinates;
  

  });
  setTimeout((function() {res.send(temp2)}), 2000);
  
   
    
});

app.get('/insert/:point',function(req,res){
  var n = (req.params.point).indexOf(",");
  var lat = parseFloat((req.params.point).substring(0,n));
  var long = parseFloat((req.params.point).substring(n+1));
  var temp = [lat,long];
  console.log(temp);
   var feature = {
  "type": "Feature",
  "properties": {
    "name": "Test Island",
    "icon": "marker"
    },
  "geometry": {
    "type": "Point",
    "coordinates": temp,
    }
  };
  client.insertFeature(feature, 'civn66zrc003g2yn2etaxhaey', function(err, feature) {
      if(!err) {
        console.log(feature);
      }
   });
});

var set;

app.get('/fetch',function(req,res){
   client.listFeatures('civn66zrc003g2yn2etaxhaey', {}, function(err, collection,res) {
       console.log(collection.features.length);
       set = collection;
       
   });
   setTimeout((function(){res.json(set)}),2000);
});

module.exports = app;
