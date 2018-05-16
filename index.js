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

// Grabbing file paths 

// Portraits
var portraitsDirectory = __dirname + "/public/images/portraits";
var portraitArray = [];

var portraitsDirectory = fs.readdirSync(portraitsDirectory).filter(function(file) {
	if (file !== '.DS_Store') {
		portraitArray.push('../images/portraits/' + file);
	}
	return portraitArray;
});

// Landscapes
var landscapesDirectory = __dirname + "/public/images/landscapes";
var landscapeArray = [];

var landscapesDirectory = fs.readdirSync(landscapesDirectory).filter(function(file) {
	if (file !== '.DS_Store') {
		landscapeArray.push('../images/landscapes/' + file);
	}
	return landscapeArray;
});


// Routes
app.get('/', function(req, res) {
  res.render('partials/main');
});

app.get('/contact', function(req, res) {
	res.render('partials/contact', { title: 'Contact' });
});

app.get('/commisions', function(req, res) {
	res.render('partials/contact', { title: 'Commisions' });
});

app.get('/portraits', function(req, res) {
	res.render('partials/portraits', { portraits: portraitArray });
});

app.get('/about', function(req, res) {
	res.render('partials/about');
});

app.get('/landscapes', function(req, res) {
	res.render('partials/landscapes', { landscapes: landscapeArray });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
