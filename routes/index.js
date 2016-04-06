var jwt = require('jsonwebtoken'),
    router = require('express').Router(),
    cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function(req, res) {
  if (req.cookies.jwt) {
    var tkn = req.cookies.jwt;
    var secret = new Buffer('1TxKX8l2I7', 'base64');
    jwt.verify(tkn, secret, function(err, token){
      if (token) {
        res.render('index');
      } else {
        res.render('login');
      }
    });
  }
  else {
    res.render('login');
  }
});

module.exports = router;
