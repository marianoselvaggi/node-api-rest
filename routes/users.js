var express = require('express');
var router = express.Router();

var UserCtrl = require('../controllers/users.js');

//get the list of users
router.get('/',(req,res)=>{
  UserCtrl.getUsers(req,res);
});

//create a new user (MUST BE A POST)
router.get('/setup',(req,res)=>{
  UserCtrl.addUser(req,res);
});

router.post('/authenticate',(req,res)=>{
  UserCtrl.authenticate(req,res);
});

module.exports = router;
