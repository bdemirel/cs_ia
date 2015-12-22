var router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    mongo = require('mongoskin'),
    db = mongo.db('mongodb://localhost:27017/it', {native_parser:true});

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res)
{
  var uname = req.body.uname,
      pword = req.body.pword;
  db.bind('users');
  console.log('ok');
  //db.users.insert({"uname":uname, "pword":pword});
  console.log(db.users.insert({"uname":uname, "pword":pword}));
});
router.get('/', function(req, res)
{
  res.render('login');
});

module.exports = router;
