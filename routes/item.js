var router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    mongo = require('mongoskin'),
    db = mongo.db('mongodb://localhost:27017/it', {native_parser:true}),
    items = db.collection('items');

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res)
{
  var _id = req.body._id,
      name = null,
      val = null;
  for (var variable in req.body) {
    if (variable != '_id') {
      name = variable;
      val = req.body[variable];
    }
  }
  var update = {};
  update[name] = val;
  items.updateById(Number(_id), {$set:update}, function(err, resu){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    console.log(resu);
    res.send(val);
  });
});

module.exports = router;
