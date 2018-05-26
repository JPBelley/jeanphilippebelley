$( document ).ready(function() {

  // General test for now, to try the nav animations
  $('#skills').on('click', function() {
    if($('body').hasClass('right')) {
      $('body').addClass('left').removeClass('right');
      $('.contactSection').removeClass('visible');
    } else {
      $('body').addClass('right').removeClass('left');
    }
    return false;
  })

  // General test for now, to try the nav animations
  $('#porfolio').on('click', function() {
    if($('body').hasClass('right')) {
      $('body').addClass('left').removeClass('right');
      $('.contactSection').removeClass('visible');
    } else {
      $('body').addClass('right').removeClass('left');
    }
    return false;
  })

  // Open the contact section
  $('#contact').on('click', function() {
    $('body').addClass('right').removeClass('left');
    $('.contactSection').addClass('visible');
    return false;
  })
});
