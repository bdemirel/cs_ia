var morgan = require('morgan'),
    express = require('express'),
    app = express(),
    index = require('/routes/index.js'),
    login = require('/routes/login.js');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use('/', index);
app.use('/login', login);

app.listen('8080');