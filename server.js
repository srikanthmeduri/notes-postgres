var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development';

var port = 3000;

if ('development' == env) {
    //app.use(morgan('dev')); 	// log every request to the console
}
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

//ejs
var pbc = path.join(__dirname, '/public');
app.use(express.static(pbc));


app.set('views', pbc);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

require('./app/routes')(app);

app.listen(port, function() {
    console.log('server listening on port ' + port);
});
