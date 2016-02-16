var jwt = require('jsonwebtoken'),
    router = require('express').Router(),
    cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function(req, res) {
  if (req.cookies.jwt) {
    var token = jwt.verify(req.cookies.jwt, '1TxKxX8l2I7');
    console.log(token);
    if (token) {
      res.render('index');
    } else {
      res.render('login');
    }
  }
  else {
    res.render('login');
  }
});

module.exports = router;
