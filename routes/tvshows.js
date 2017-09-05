var express = require('express');
var router = express.Router();

var TVShowCtrl = require('../controllers/tvshows.js');

router.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

router.route('tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

module.exports = router;
