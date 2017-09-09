var $ = require('jQuery');
var smoothScroll = require('jquery-smooth-scroll')

$(document).ready(function(){

	$('#contact').on('click', function() {
		$.smoothScroll();
	});
	
});