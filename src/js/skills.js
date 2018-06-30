// General test for now, to try the nav animations
$('#skills').on('click', function() {
  $('section').removeClass('visible');
  $('#skillsSection').addClass('visible');
  if($('body').hasClass('right')) {
    return false;
  } else {
    $('body').addClass('right').removeClass('left');
  }
  return false;
})
