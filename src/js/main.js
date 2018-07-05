$( document ).ready(function() {
  // Menu burger mobile
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('nav').toggleClass('open-nav');
    $('.mobile-nav').toggleClass('open-mobile-nav');
  })

  $('nav a').on('click', function() {
    $('.hamburger').removeClass('is-active');
    $('nav').removeClass('open-nav');
    $('.mobile-nav').removeClass('open-mobile-nav');
  })
});
