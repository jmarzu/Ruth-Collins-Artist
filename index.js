require('dotenv').config();

var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
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
	res.render('contact');
});

app.get('/about', function(req, res) {
	res.render('about');
});

// Send email for contact form with google recaptcha
app.post('/contact', function(req, res) {
	var mailOpts, smtpTrans;
	smtpTrans = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: "OAuth2",
		    user: process.env.GMAIL_USER,
		    clientId: process.env.CLIENT_ID,
		    clientSecret: process.env.CLIENT_SECRET,
		    refreshToken: process.env.REFRESH_TOKEN,
		    accessToken: process.env.ACCESS_TOKEN 
		}
	});
	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;',
		to: process.env.GMAIL_USER,
		subject: 'New message from contact form at ruthscollins.com',
		text: req.body.name + ' ' + req.body.email + ' says: ' + req.body.message
	};
	smtpTrans.sendMail(mailOpts, function(error, response) {
		if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
	      return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
	    }

	    var secretKey = process.env.SECRET_KEY;
	    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret="+ process.env.SECRET_KEY +"&response=" + req.body['g-recaptcha-response'];

	    request(verificationUrl, function(err, resp, body) {
	      body = JSON.parse(body);
	      if(body.success !== undefined && !body.success) {
	        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
	      }
	      res.render('contact-success');
	    });
	});
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
