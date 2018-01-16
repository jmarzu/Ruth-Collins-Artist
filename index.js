var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

// Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/payment', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/views/payment.html'));
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
