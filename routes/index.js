var router = require('express').Router();

router.use(express.cookieParser());
router.get('/', function(req, res)
{
  /*var token = jwt.verify(req.cookie.jwt, '1TxKX8l2I7');
  console.log(token);
  res.render('index');*/
  res.render('index');
});

module.exports = router;
