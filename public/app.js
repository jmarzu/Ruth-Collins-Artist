var $ = require('jquery');
var slick = require('slick-carousel');

$(document).ready(function() {

  $('.rc-landing-page__carousel').slick({
    dots: true,
    infinite: true,
    speed: 750,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2500
  });

  window.onload = function() {
    var $recaptcha = document.querySelector('#g-recaptcha-response');

    if($recaptcha) {
        $recaptcha.setAttribute("required", "required");
    }
  };
});



