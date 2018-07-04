var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(ejsLayouts);

// Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Art Data
var artData = JSON.parse(fs.readFileSync('./public/data.json'));
var landscapeData = artData.landscapes;
var portraitData = artData.portraits


// Routes
app.get('/', function(req, res) {
  res.render('main');
});

app.get('/portraits', function(req, res) {
	res.render('art', { artData: portraitData, title: 'Portraits' });
});

app.get('/landscapes', function(req, res) {
	res.render('art', { artData: landscapeData, title: 'Landscapes' });
});

app.get('/contact', function(req, res) {
	res.render('contact', { title: 'Contact' });
});

// app.get('/commissions', function(req, res) {
// 	res.render('contact', { title: 'Commission' });
// });

app.get('/about', function(req, res) {
	res.render('about');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
