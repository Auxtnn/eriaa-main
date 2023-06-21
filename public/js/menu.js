// menu.js

// Function to fetch and render menu items
const fetchMenuItems = async () => {
    try {
      const response = await fetch('/menu-posts');
      const menu = await response.json();
  
      // Get the DOM elements to populate with menu items
      const cookedMenuItems = document.getElementById('cooked-menu-items');
      const grilledMenuItems = document.getElementById('grilled-menu-items');
      const bakedMenuItems = document.getElementById('baked-menu-items');
      const dessertsMenuItems = document.getElementById('deserts-menu-items');
      const beverageMenuItems = document.getElementById('beverage-menu-items');
  
      // Loop through the menu items and create the HTML dynamically
      menu.forEach((item) => {
        const menuItem = `
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 menu-item" id="sec-meal">
            <figure>
              <div class="images">
                <img src="${item.image}" alt="Menu Image">
              </div>
              <div class="content">
                <h4 class="menu-name">${item.name}</h4>
                <p class="menu-description">${item.description}</p>
                <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
              </div>
            </figure>
          </div>
        `;
  
        // Append the menu item to the appropriate category section
        if (item.category === 'cooked') {
          cookedMenuItems.innerHTML += menuItem;
        } else if (item.category === 'grilled') {
          grilledMenuItems.innerHTML += menuItem;
        } else if (item.category === 'baked') {
          bakedMenuItems.innerHTML += menuItem;
        } else if (item.category === 'desserts') {
          dessertsMenuItems.innerHTML += menuItem;
        } else if (item.category === 'beverage') {
          beverageMenuItems.innerHTML += menuItem;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Call the fetchMenuItems function to populate the menu items on page load
  fetchMenuItems();
  