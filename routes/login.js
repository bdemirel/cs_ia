var router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    mongo = require('mongoskin'),
    db = mongo.db('mongodb://localhost:27017/it', {native_parser:true});

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res)
{
  console.log(req.body.uname, req.body.pword);
  var uname = req.body.uname,
      pword = req.body.pword,
      users = db.collection('users');
  users.find({'uname':uname}).toArray(function(err, user)
  {
    if (err) console.log(err);
    user = user[0];
    if (pword==user.pword)
    {
      var token = jwt.sign({'uname':user.uname, 'pword':user.pword}, '1TxKX8l2I7', {'expiresInMinutes':true});
      db.close();
      res.status(200).json({'auth':true, 'token':token});
    }
    else
    {
      db.close();
      res.status(401).json({'auth': false});
    }
  });
});
router.get('/', function(req, res)
{
  res.render('login');
});

module.exports = router;
