var morgan = require('morgan'),
    express = require('express'),
    app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.listen('8080');
