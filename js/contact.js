// Open the contact section
$('#contact').on('click', function() {
  $('section').removeClass('visible');
  $('#contactSection').addClass('visible');
  if($('body').hasClass('left')) {
    return false;
  } else {
    $('body').addClass('left').removeClass('right');
  }
  return false;
})
