function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).ready(function() {
    // Function to check screen width and redirect if necessary
    function checkScreenWidthAndRedirect() {
        // Check if the current URL is not the target URL
        if (window.location.pathname !== "/responsive/index.html" && $(window).width() < 768) {
            window.location.href = "responsive/index.html";
        } else if (window.location.pathname !== "/index.html" && $(window).width() >= 768) {
            window.location.href = "index.html";
        }
    }

    // Call the function when the document is ready
    checkScreenWidthAndRedirect();

    // Assign active class to nav links while scrolling
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        // You can add your scrolling functionality here if needed

        // Get the button
        let mybutton = document.getElementById("myBtn");
    });
});
