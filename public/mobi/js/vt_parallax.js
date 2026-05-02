
(function(){

  var parallax = document.querySelectorAll(".parallax-1");
	  var parallax2 = document.querySelectorAll(".parallax-2");
    var parallax3 = document.querySelectorAll(".parallax-3");
      speed = 0.5;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "100% " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });
		[].slice.call(parallax2).forEach(function(el,i){

      var windowYOffset = window.pageYOffset - 1200,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });
    [].slice.call(parallax3).forEach(function(el,i){

      var windowYOffset = window.pageYOffset - 2400,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });



  };








})();
