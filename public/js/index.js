
/*  Proloder */
$(window).on('load', function () {
  $('#preloader-active').delay(450).fadeOut('slow');
  $('body').delay(450).css({
    'overflow': 'visible'
  });
});


//menu toggle
const menuToggle = document.querySelector('.navbar-toggler');
const menu = document.querySelector('.menu');
menuToggle.addEventListener('click', () => {
  event.preventDefault();
  menu.classList.toggle('show-menu');
});

// document.addEventListener('DOMContentLoaded', function() {
//   event.preventDefault();
//   const navbarToggle = document.querySelector('.navbar-toggler');
//   const navbarCollapse = document.querySelector('.navbar-collapse');

//   navbarToggle.addEventListener('click', function() {
//     navbarCollapse.classList.toggle('show');
//   });
// });

  // ---------------------------------------
  
  $(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
      margin: 10,
      nav: true,
      loop: true,
      responsive: {
         0: {
          items: 1
                    },
        600: {
          items: 2
                    },
        1000: {
          items: 3
        }
      }
    })
   });
  
  // ---------------------------------------


  // Get the modal
var modal = document.querySelector('.modal-dialog');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// addding signup function

   // Function to show/hide dropdown menus on hover
   function toggleDropdown() {
    var dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener("mouseover", function() {
            this.querySelector(".dropdown-menu").style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function() {
            this.querySelector(".dropdown-menu").style.display = "none";
        });
    });
}

// Call the toggleDropdown function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    toggleDropdown();
});

