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

  // Assign active class to nav links while scrolling
  $(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    // You can add your scrolling functionality here if needed
  });
});
