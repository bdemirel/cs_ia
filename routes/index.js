var jwt = require('jsonwebtoken'),
    router = require('express').Router(),
    cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function(req, res) {
  //console.log(req.cookies.SESS_TKN);
  if (req.cookies.jwt) {
    console.log(req.cookies.jwt);
    console.log(typeof req.cookies.jwt);
    jwt.verify(req.cookies.jwt, '1TxKxX8l2I7', function(err, token){
      console.log("err:"+err);
      console.log("tkn:"+token);
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
