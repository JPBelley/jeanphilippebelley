parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"d6sW":[function(require,module,exports) {
function s(s,t){return Math.random()*(t-s)+s}var t=.5,e={loop:!0,speed:3e3,grabCursor:!0,watchSlidesProgress:!0,effect:"fade",mousewheelControl:!0,keyboardControl:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{progress:function(){for(var s=0;s<this.slides.length;s++){var e=this.slides[s].progress*(this.width*t);this.slides[s].querySelector(".headline").setAttribute("style","transform: translate3d("+e+"px, 0, 0);")}},touchStart:function(){for(var s=0;s<this.slides.length;s++)this.slides[s].style.transition=""},setTransition:function(t){for(var e=0;e<this.slides.length;e++)this.slides[e].style.transition=t+"ms",this.slides[e].querySelector(".headline").style.transition=.85*t+"ms",this.slides[e].querySelectorAll(".single-square").forEach(function(t){t.style.transition=s(0,2)+"s",t.style.opacity="1"})},transitionStart:function(s){for(var t=0;t<this.slides.length;t++)this.slides[t].classList.contains("swiper-slide-active")||this.slides[t].querySelectorAll(".single-square").forEach(function(s){s.style.opacity="0"})}}},i=new Swiper(".swiper-container",e);
},{}]},{},["d6sW"], null)
//# sourceMappingURL=http://jeanphilippebelley.com/main.08e35014.js.map