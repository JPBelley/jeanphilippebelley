$( document ).ready(function() {

  // Learn more CTA to open web site
  $('.visit a').on('click', function() {
    $('#homeSection').addClass('hide-home');
    $('#portfolioSection').addClass('visible');
    $('nav').addClass('visible');
  })
});
