var _ = require('lodash/dist/lodash.compat.min.js');

var NAV_EL = '#nav-top';
var STATIC_NAV_ATTR = 'data-nav-static';
var NAV_TOGGLE_ATTR = 'data-nav-toggle';

function getWidthOfWrapper() {
  var $wrap = $(NAV_EL);
  return $wrap.width();
}

function getWidthOfContent() {
  var $links = $('#nav-top ul li');
  var arrayOfWidths = $links.map(function() {
    return $(this).width()
  });
  var totalWidth = _.reduce(arrayOfWidths, function(sum, num) {
    return sum + num;
  }, 0);
  return totalWidth;
}

function navFits() {
  return ( (getWidthOfContent() + 60) < getWidthOfWrapper() );
}

function calculateNavType() {
  if ( $(document).width() >= 600 && navFits() )
    return $('body').attr(STATIC_NAV_ATTR, true);
  return $('body').attr(STATIC_NAV_ATTR, false);
}

function showToggleBtn() {
  var navHeight = $(NAV_EL).height();
  var position  = $(window).scrollTop();
  if ( position > navHeight )
    return $('body').attr(NAV_TOGGLE_ATTR, true);
  return $('body').attr(NAV_TOGGLE_ATTR, false);
}

$(document).ready(calculateNavType);
$(window).resize(calculateNavType);

$(document).ready(showToggleBtn);
$(window).scroll(showToggleBtn);
