$(function() {

  var $slideshow = $('[data-carousel]');

  $slideshow.slick({
    slide: 'article',
    dots: true,
    speed: 400,
    fade: false,
    arrows: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  });

});
