<!--Sidebar-->
$(document).ready(function() {
      	$('.sidebar').simpleSidebar({
      		opener: '#open-sb',
      		wrapper: 'main_content',
      		animation: {
      			easing: 'easeOutQuint'
      		},
      		sidebar: {
						align: "right",
						width: 260,
						closingLinks: 'a',
      		},
					mask: {
							display: true,
							css: {
									backgroundColor: "black",
									opacity: 0.5,
									filter: "Alpha(opacity=30)"
							}
					},
      		sbWrapper: {
      			display: true
      		},
					style: {
		             zIndex: 500
		         }
      	})
      })




<!-- Sidebar End-->



$('body').show();
$(window).load(function(){
NProgress.done();
});

$(document).ready(function() {
NProgress.configure({ showSpinner: false });
NProgress.start();
});


$( "form" ).submit(function() {
//$(".thankYou").css( "display","block");
//delay(1000);$(".thankYou").css( "display","none");

});
