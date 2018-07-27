var $ = require('jquery');
require('jquery-form-validator');
require('jquery-form-validator/form-validator/html5');
require('jquery-serializejson');
var nodemailer = require('nodemailer');
var slick = require('slick-carousel');

$(document).ready(function() {

  $('.rc-landing-page__carousel').slick({
    dots: true,
    infinite: true,
    speed: 750,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000
  });

  window.onload = function() {
    var $recaptcha = document.querySelector('#g-recaptcha-response');

    if($recaptcha) {
        $recaptcha.setAttribute("required", "required");
    }
  };

  $('#HBmenu').on('click', function(event) {
    event.preventDefault();
    var navItem = $('.rc-nav__item');
    if(navItem.css("display") === "none") {
        navItem.css("display", "block");
    } else if (navItem.css("display") === "block")  {
          navItem.css("display", "none");
    }
  });

  // initForm();

  // var $formContainer, $formThankYou, $form, $formError, $formBtn;

  // function initForm() {
  //   $formContainer = $('#rc-contact-form-container');
  //   $formThankYou = $('#rc-contact-form-thank-you');
  //   $form = $('#rc-contact-form');
  //   $formError = $('#rc-contact-form-error');
  //   $formBtn = $('#rc-contact-form-btn');
  //   $.validate({
  //     form: '#rc-contact-form',
  //     modules: 'html5',
  //     borderColorOnError: '',
  //     onSuccess: formSubmit
  //   });
  //   $formError.hide();
  //   $formThankYou.hide();
  // }

  // function formSubmit() {
  //   $formError.hide();

  //   $.post('/contact', function(req, res) {
  //     console.log(req, res);
  //     var mailOpts, smtpTrans;
  //     smtpTrans = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         type: "OAuth2",
  //           user: process.env.GMAIL_USER,
  //           clientId: process.env.CLIENT_ID,
  //           clientSecret: process.env.CLIENT_SECRET,
  //           refreshToken: process.env.REFRESH_TOKEN,
  //           accessToken: process.env.ACCESS_TOKEN 
  //       }
  //     });
  //     mailOpts = {
  //       from: req.body.name + ' &lt;' + req.body.email + '&gt;',
  //       to: process.env.GMAIL_USER,
  //       subject: 'New message from contact form at ruthscollins.com',
  //       text: req.body.name + ' ' + req.body.email + ' says: ' + req.body.message
  //     };
  //     smtpTrans.sendMail(mailOpts, function(error, response) {
  //       if(error) {
  //         res.render('contact-failure');
  //         console.log(error);
  //       } else {
  //         res.render('contact-success');
  //         console.log(response);
  //       }
  //     });
  //   });

  //   return false;
  // }

  // function formSuccess() {
  //   $formContainer.hide();
  //   $formThankYou.fadeIn();
  // }

  // function formError() {
  //   formBtnToggle(false);
  //   $formError.fadeIn();
  // }

  // function formBtnToggle(disable) {
  //   if (disable) {
  //     $formBtn.html('Sending...').prop('disable', true);
  //   } else {
  //     $formBtn.html('Send').prop('disable', false);
  //   }
  // }

  // function formReset() {
  //   $form.get(0).reset();
  //   formBtnToggle(false);
  //   $formError.hide();
  //   $formThankYou.hide();
  //   $formContainer.fadeIn();
  // }
});




