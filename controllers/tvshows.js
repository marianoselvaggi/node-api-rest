var mongoose = require('mongoose');
var TVShow = require('../models/tvshow.js');

//get - return all the tvshows from the db
exports.findAllTVShows = function(req,res){
  TVShow.find(function(err,tvshows){
    if(err) return res.send(500,err.message);
    console.log(tvshows);
    res.status(200).jsonp(tvshows);
  });
};

//get - return one tvshow by id
exports.findById = function(req,res){
  TVShow.findById(req.params.id, function(err,tvshow){
    if(err) return res.send(500,err.message);

    console.log(tvshow);
    res.status(200).jsonp(tvshow);
  });
};

//POST - insert one record in the db
exports.addTVShow = function(req,res){
  console.log('POST');
  console.log(req.body);

  var tvshow = new TVShow({
    title:    req.body.title,
		year: 	  req.body.year,
		country:  req.body.country,
		poster:   req.body.poster,
		seasons:  req.body.seasons,
		genre:    req.body.genre,
		summary:  req.body.summary
  });

  tvshow.save(function(err,tvshow){
    if(err) return res.send(500,err.message);
    res.status(200).send(tvshow);
  });
};

//PUT - update one tvshow in the db
exports.updateTVShow = function(req,res){
  TVShow.findById(req.params.id, function(err,tvshow){
    if(err) return res.status(500).send(err.message);

    tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

    tvshow.save(function(err,tvshow){
      if(err) return res.status(500).send(err.message);
      res.status(200).send(tvshow);
    });
  })
};

//DELETE - delete one tvshow from the db
exports.deleteTVShow = function(req,res){
  TVShow.findById(req.params.id, function(err,tvshow){
    if(err) return res.status(500).send(err.message);
    tvshow.remove(function(err){
      if(err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};
