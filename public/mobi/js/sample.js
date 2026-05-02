

    //<![CDATA[
    $(window).load(function(){
    $(document).ready(function () {
	    if ($(document).scrollTop() >= 100){
            $('#header_nav').removeClass("trans");
            } else if ($(document).scrollTop() <= 100){
                $('#header_nav').addClass("trans");
                }
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-100
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});
//update header on scroll
function onScroll(event){
    var scrollPos = $(document).scrollTop();
	if (scrollPos >= 50){
        $('#header_nav').removeClass("trans");
        } else if(scrollPos <= 50){
            $('#header_nav').addClass("trans");
            }

    $('nav a').each(function () {
        var currLink = $(this);
        alert(currLink.text);
        var refElement = $(currLink.attr("href"));
        if ((refElement.position().top-100) <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
});//]]>
