//HOTFIX: MARIANO!!!

var express = require('express'),
  app = express(),
//  http = require('http'),
//  server = http.createServer(app),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/',(req,res)=>{
  res.send('Hello world');
});

app.use(router);

var TVShowCtrl = require('./controllers/tvshows.js');

//API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api',tvshows);

mongoose.connect('mongodb://127.0.0.1:27017/tvshows',{},function(err,res){
  if(err){
    console.log('Error: connecting to Database. ' + err);
  } else {
    app.listen(3000, function(){
      console.log("Node server running on http://localhost:3000");
    });
  }
});
