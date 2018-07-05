function showPortfolio() {
  if ($(window).width() > 1025) {
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
  }
}
showPortfolio();
$(window).resize(function() {
  showPortfolio();
});
