$("#about").on("click",function(){return $("section").removeClass("visible"),$("#aboutSection").addClass("visible"),$("body").hasClass("right")||$("body").addClass("right").removeClass("left"),!1});
$("#contact").on("click",function(){return $("section").removeClass("visible"),$("#contactSection").addClass("visible"),$("body").hasClass("left")||$("body").addClass("left").removeClass("right"),!1});
$(document).ready(function(){var i=$(".my-name"),a=$(".my-job"),n=$(".visit a");function e(n,i){var a=n.text().split("");n.empty(),$.each(a,function(i,a){n.append("<span>"+a+"</span")}),setTimeout(function(){n.find("span").addClass("fade-in")},i)}setTimeout(function(){$(".visit a").addClass("fade-in")},1500),e(i,500),e(a,750),e(n,1e3),$(".visit a").on("click",function(){$("#homeSection").addClass("hide-home"),$("#portfolioSection").addClass("visible"),$("nav").addClass("visible")})});
$(document).ready(function(){$(".hamburger").on("click",function(){$(this).toggleClass("is-active"),$("nav").toggleClass("open-nav"),$(".mobile-nav").toggleClass("open-mobile-nav")})});
$(document).ready(function(){$("#porfolio").on("click",function(){return $("section").removeClass("visible"),$("#portfolioSection").addClass("visible"),$("body").hasClass("left")||$("body").addClass("left").removeClass("right"),!1})});
$("#skills").on("click",function(){return $("section").removeClass("visible"),$("#skillsSection").addClass("visible"),$("body").hasClass("right")||$("body").addClass("right").removeClass("left"),!1});