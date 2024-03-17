function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// This function will handle the initial redirection based on screen size
function initialRedirection() {
    var screenWidthThreshold = 768; // Define the screen width threshold
    var currentPage = window.location.pathname.split('/').pop(); // Get the current page

    // Check if the screen width is less than the threshold and the current page is not responsive-style.html
    if (window.innerWidth < screenWidthThreshold && currentPage !== 'responsive-style.html') {
        // Redirect to responsive-style.html
        window.location.pathname = window.location.pathname.replace(currentPage, 'responsive-style.html');
    }
}

// Call the initialRedirection function on initial load
document.addEventListener('DOMContentLoaded', initialRedirection);

$(document).ready(function() {
    // Assign active class to nav links while scrolling
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        // Get the button
        let mybutton = document.getElementById("myBtn");
        // Add logic here for the button or other scroll-related functionality
    });
});
