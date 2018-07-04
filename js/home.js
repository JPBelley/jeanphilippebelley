$( document ).ready(function() {

  // Wrap each letter in a span to make thme slowly fade in
  var myName = $('.my-name');
  var myJob = $('.my-job');
  var visit = $('.visit a');

  function spanAndFade(selector, transTime) {
    var characters = selector.text().split("");
    selector.empty();

    $.each(characters, function (i, el) {
        selector.append("<span>" + el + "</span");
    });

    setTimeout(function(){
      selector.find('span').addClass("fade-in");
    }, transTime);
  }

  setTimeout(function(){
    $('.visit a').addClass("fade-in");
  }, 1500);

  spanAndFade(myName, 500);
  spanAndFade(myJob, 750);
  spanAndFade(visit, 1000);



  // Learn more CTA to open web site
  $('.visit a').on('click', function() {
    $('#homeSection').addClass('hide-home');
    $('#portfolioSection').addClass('visible');
    $('nav').addClass('visible');
  })
});
