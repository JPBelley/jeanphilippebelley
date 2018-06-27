// About Section
$('#about').on('click', function() {
  if($('body').hasClass('left')) {
    return false;
  } else {
    $('section').removeClass('visible');
    $('#aboutSection').addClass('visible');
    $('body').addClass('left').removeClass('right');
  }
  return false;
})
