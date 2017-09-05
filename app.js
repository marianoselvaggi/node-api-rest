//otro camgio de archi

//MARIAANOOOOOOO

var express = require('express'),
  app = express(),
//  http = require('http'),
//  server = http.createServer(app),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  config = require('./config.js'),
  morgan = require('morgan')

//config variables and routes
var port = process.env.PORT || 8080;
var users = require('./routes/users.js');
var index = require('./routes/index.js');
var tvshows = require('./routes/tvshows.js');

app.use(morgan('dev'));
app.set('supersecret',config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//routes
app.use('/',index);
var middleware = require('./controllers/middleware.js');
app.use(middleware);
app.use('/users',users);
app.use('/api',tvshows);

//connect to db
mongoose.connect(config.database,{},function(err,res){
  if(err){
    console.log('Error: connecting to Database. ' + err);
  } else {
    app.listen(port, function(){
      console.log("Node server running on http://localhost:" + port);
    });
  }
});
