$(function() {

  var $slideshow = $('[data-carousel]');

  var opts = {
    slide: 'article',
    dots: true,
    speed: 400,
    fade: false,
    arrows: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: false,
    pauseOnHover: true,
    pauseOnDotsHover: true
  }

  $slideshow.slick(opts);

});
