$( document ).ready(function() {

  // Open portfolio/work section
  $('#porfolio').on('click', function() {
    $('section').removeClass('visible');
    $('#portfolioSection').addClass('visible');
    if($('body').hasClass('left')) {
      return false;
    } else {
      $('body').addClass('left').removeClass('right');
    }
    return false;
  })

});
