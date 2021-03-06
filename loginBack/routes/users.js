var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register',function(req,res,next){
  addToDB(req,res);
});

async function addToDB(req,res){
  var user = new User({
    email:req.body.email,
    username:req.body.username,
    password:User.hashPassword(req.body.password),
    creation_dt:Date.now()
  });


  try{
    let doc = await user.save();
    return res.status(201).json(doc);
  }
  catch{
    return res.status(501).json(err);
  }
}


router.post('/login',function(req,res,next){

  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(info); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Successful'});
    });
  })(req, res, next);

});

module.exports = router;
