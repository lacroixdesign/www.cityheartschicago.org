/* global WOW */

$(function() {

  if (Modernizr.cssanimations && typeof WOW !== 'undefined') {
    new WOW({
      boxClass: 'a-wow',
      mobile: false
    }).init();
  }

});
