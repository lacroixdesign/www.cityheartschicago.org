/* global WOW */

var domReady = require('../lib/domready');

(function() {

  domReady(function() {

    if (Modernizr.cssanimations && typeof WOW !== 'undefined') {
      new WOW({
        boxClass: 'a-wow',
        mobile: false
      }).init();
    }

  });

})();
