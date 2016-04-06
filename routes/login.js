var router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    mongo = require('mongoskin'),
    db = mongo.db('mongodb://localhost:27017/it', {native_parser:true});

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res)
{
  var uname = req.body.uname,
      pword = req.body.pword,
      users = db.collection('users');
  users.find({'uname':uname}).toArray(function(err, user)
  {
    if (err) console.log(err);
    user = user[0];
    if ((user)&&(pword==user.pword))
    {
      var secret = new Buffer('1TxKX8l2I7', 'base64');
      var token = jwt.sign({'uname':user.uname, 'pword':user.pword}, secret, {'expiresIn':600});
      db.close();
      jwt.verify(token, secret, function(err, tkn){
        res.status(200).json({'auth':true, 'token':token});
      });
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
  //console.log('get');
  //res.render('login');
  //res.send('Hello World');
  res.redirect('/');
});

module.exports = router;
