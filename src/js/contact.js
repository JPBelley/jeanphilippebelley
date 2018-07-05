// Open the contact section
function showContact() {
  if ($(window).width() > 1025) {
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
  }
}
showContact();
$(window).resize(function() {
    showContact();
});
