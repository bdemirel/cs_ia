var morgan = require('morgan'),
    express = require('express'),
    app = express(),
    index = require('./routes/index'),
    login = require('./routes/login');
    item = require('./routes/item');
    //signup = require('./routes/signup');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/public'));
app.use('/', index);
app.use('/login', login);
app.use('/item', item);

/*
app.get('/', function(req, res)
{
  res.send('Hello World');
});
*/
app.locals.pretty = true;
app.listen('8080');
