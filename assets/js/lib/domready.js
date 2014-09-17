var domready = function(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete' ||
          document.readyState === 'interactive') {
        fn();
      }
    });
  }
};

module.exports = domready;
