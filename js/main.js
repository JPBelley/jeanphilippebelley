function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var interleaveOffset = 0.5;

var swiperOptions = {
    loop: true,
    speed: 3000,
    grabCursor: true,
    watchSlidesProgress: true,
    effect: 'fade',
    mousewheelControl: true,
    keyboardControl: true,
    // autoplay: {
    //   delay: 4000,
    // },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        progress: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;

                swiper.slides[i].querySelector(".headline").setAttribute(
                    "style", "transform: translate3d(" + innerTranslate + "px, 0, 0);");
            }
        },
        touchStart: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
        },
        setTransition: function (speed) {
            var swiper = this;

            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".headline").style.transition =
                    (speed * .85) + "ms";
                swiper.slides[i].querySelectorAll(".single-square").forEach(function (square) {
                    square.style.transition =
                        getRandomArbitrary(0, 2) + "s";
                    square.style.transitionProperty =
                        "opacity";
                    square.style.opacity =
                        "1";
                });
            }
        },
        transitionStart: function (speed) {
            var swiper = this;

            for (var i = 0; i < swiper.slides.length; i++) {
                if (!swiper.slides[i].classList.contains('swiper-slide-active')) {
                    swiper.slides[i].querySelectorAll(".single-square").forEach(function (square) {
                        square.style.opacity =
                            "0";
                    });
                }
            }
        }
    }
};

var swiper = new Swiper(".swiper-container", swiperOptions);