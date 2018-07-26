require('dotenv').config();

var express = require('express');
var nodemailer = require('nodemailer');
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
	res.render('contact');
});

app.get('/about', function(req, res) {
	res.render('about');
});

// Send email for contact form  
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
		if(error) {
			res.render('contact-failure');
		} else {
			res.render('contact-success');
		}
	});
});

var RECAPTCHA_SECRET = process.env.SECRET_KEY;

app.post("/contact", function(request, response) {
    var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
    recaptcha_url += "secret=" + RECAPTCHA_SECRET + "&";
    recaptcha_url += "response=" + request.body["g-recaptcha-response"] + "&";
    recaptcha_url += "remoteip=" + request.connection.remoteAddress;
    Request(recaptcha_url, function(error, resp, body) {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
            return response.send({ "message": "Captcha validation failed" });
        }
        response.header("Content-Type", "application/json").send(body);
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
