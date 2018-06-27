$( document ).ready(function() {

  // Open portfolio/work section
  $('#porfolio').on('click', function() {
    if($('body').hasClass('left')) {
      return false;
    } else {
      $('section').removeClass('visible');
      $('#portfolioSection').addClass('visible');
      $('body').addClass('left').removeClass('right');
    }
    return false;
  })

});
