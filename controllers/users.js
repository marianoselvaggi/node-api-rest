var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

exports.getUsers = function(req,res){
  User.find({},(err,users)=>{
    if(err) return res.send(500,err.message);
    res.status(200).jsonp(users);
  });
};

//get - return all the tvshows from the db
exports.addUser = function(req,res){
  //create a sample user
  var usr = new User({
    name: 'Benicio',
    password: '12345',
    admin: true
  });

  usr.save(function(err,user){
      if(err) return res.status(500).send(err.message);
      console.log('User saved successfully!');
      res.json({success:true});
  });
};

exports.authenticate = function(req,res){
  User.findOne({name: req.body.name},function(err,user){

    if(err) return res.status(500).send(err.message); //if any error happen, then thow the error out

    if(!user){
      res.json({success:false,message:'Authentication failed. User not found'});
    } else {
      if(user.password != req.body.password){
        console.log(user);
        res.json({success: false, message: 'Authentication failed. Wrong password'});
      } else {
        //create the token
        var token = jwt.sign(user, req.app.get('supersecret'),{
          expiresIn: 60*60*24
        });
        //send the response
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};
