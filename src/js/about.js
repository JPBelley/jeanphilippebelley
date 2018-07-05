// About Section
function showAbout() {
  if ($(window).width() > 1025) {
    $('#about').on('click', function() {
      $('section').removeClass('visible');
      $('#aboutSection').addClass('visible');
      if($('body').hasClass('right')) {
        return false;
      } else {
        $('body').addClass('right').removeClass('left');
      }
      return false;
    })
  }
}
showAbout();
$(window).resize(function() {
    showAbout();
});
