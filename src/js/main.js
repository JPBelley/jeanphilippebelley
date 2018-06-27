$( document ).ready(function() {

  // Menu burger
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('nav').toggleClass('open-nav');
    $('.mobile-nav').toggleClass('open-mobile-nav');
  })

  // General test for now, to try the nav animations
  $('#skills').on('click', function() {
    if($('body').hasClass('right')) {
      return false;
    } else {
      $('section').removeClass('visible');
      $('#skillsSection').addClass('visible');
      $('body').addClass('right').removeClass('left');
    }
    return false;
  })

  // Open the contact section
  $('#contact').on('click', function() {
    if($('body').hasClass('right')) {
      return false;
    } else {
      $('section').removeClass('visible');
      $('#contactSection').addClass('visible');
      $('body').addClass('right').removeClass('left');
    }
    return false;
  })

});
