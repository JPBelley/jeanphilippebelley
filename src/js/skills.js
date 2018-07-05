// General test for now, to try the nav animation
function showSkills() {
  if ($(window).width() > 1025) {
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
  }
}
showSkills();
$(window).resize(function() {
  showSkills();
});
