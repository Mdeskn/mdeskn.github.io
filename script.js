$(document).ready(function() {
    
    // Smooth scrolling for navbar links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var headerHeight = $('header').outerHeight();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });


    // Assign active class to nav links while scrolling
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance && $(this).position().top + $(this).outerHeight() > scrollDistance) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll(); // Trigger scroll function on page load

});

