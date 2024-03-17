function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// This function will handle the redirection based on screen size
function handleRedirection() {
    var screenWidthThreshold = 768; // Define the screen width threshold
    var currentPage = window.location.pathname.split('/').pop(); // Get the current page

    // Check if the screen width is less than the threshold and the current page is not responsive-style.html
    if (window.innerWidth < screenWidthThreshold && currentPage !== 'responsive-style.html') {
        // Store the state in session storage
        sessionStorage.setItem('page', 'responsive-style.html');
        // Redirect to responsive-style.html
        window.location.pathname = window.location.pathname.replace(currentPage, 'responsive-style.html');
    }
    // Check if the screen width is greater than or equal to the threshold and the current page is not index.html
    else if (window.innerWidth >= screenWidthThreshold && currentPage !== 'index.html') {
        // Store the state in session storage
        sessionStorage.setItem('page', 'index.html');
        // Redirect to index.html
        window.location.pathname = window.location.pathname.replace(currentPage, 'index.html');
    }
}

// Attach the handleRedirection function to the window resize event
window.addEventListener('resize', handleRedirection);

// Call the handleRedirection function on initial load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a stored page state in session storage
    var storedPage = sessionStorage.getItem('page');
    var currentPage = window.location.pathname.split('/').pop();

    // If there's a stored page and it's different from the current page, redirect to the stored page
    if (storedPage && storedPage !== currentPage) {
        window.location.pathname = window.location.pathname.replace(currentPage, storedPage);
    } else {
        // Otherwise, handle redirection based on the current screen size
        handleRedirection();
    }
});

$(document).ready(function() {

    // Assign active class to nav links while scrolling
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        // Get the button
        let mybutton = document.getElementById("myBtn");

    });

});
