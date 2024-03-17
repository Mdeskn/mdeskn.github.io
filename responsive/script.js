function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    dropdownMenu.classList.toggle('active');
  });

  // Close the menu when a link is clicked
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav') && dropdownMenu.classList.contains('active')) {
      menuBtn.classList.remove('open');
      dropdownMenu.classList.remove('active');
    }
  });

  // Get the button
  let mybutton = document.getElementById("myBtn");

  $(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
  });
});
