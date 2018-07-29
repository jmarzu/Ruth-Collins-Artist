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
});




