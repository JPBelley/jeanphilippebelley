$( document ).ready(function() {
  // Menu burger
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('nav').toggleClass('open-nav');
    $('.mobile-nav').toggleClass('open-mobile-nav');
  })
});
