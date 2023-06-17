
// for admin dash
(function ($) {
    "use strict";

    // Spinner
    const spinner = () => {
        setTimeout( () => {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
 

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
    
})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
  // Handle form submission
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the search query
    const searchQuery = document.getElementById('searchInput').value;

    // Process the search query (perform search operation, AJAX request, etc.)

    // Redirect to search results page
    window.location.href = '/search?q=' + searchQuery;
  });
});

// admin end

  // password toggle
  function myToggle() {
    const code = document.getElementById('password');
    if (code.type === 'password') {
      code.type = 'text';
    } else {
      code.type = 'password'
    }
  }