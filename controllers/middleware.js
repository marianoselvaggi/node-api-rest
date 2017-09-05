var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  //decode the token
  if (token) {
    //verifies token & check exp

    jwt.verify(token,req.app.get('supersecret'),function(err,decoded){
      if (err) {
        return res.json({success: true, message: 'Failed to authenticate token'});
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    //there is no token
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
};
