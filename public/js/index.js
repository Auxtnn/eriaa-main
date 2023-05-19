// Get cart items from local storage or initialize as empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Update cart icon and count
function updateCartIcon() {
  let cartCount = document.querySelector(".cart-count");
  let itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = itemCount;
}

// Add item to cart
function addToCart(name, price) {
  // Check if item already exists in cart
  let existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: name, price: price, quantity: 1 });
  }
  // Save cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Update cart icon and count
  updateCartIcon();
  // Show "Added" message for 1 second
  let addedMsg = document.createElement("span");
  addedMsg.classList.add("added-msg");
  addedMsg.textContent = "Added";
  let addToCartBtn = event.target;
  addToCartBtn.parentElement.appendChild(addedMsg);
  setTimeout(() => {
    addedMsg.remove();
  }, 1000);
}

// Remove item from cart
function removeCartItem(index) {
  cartItems.splice(index, 1);
  // Save cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Update cart icon and count
  updateCartIcon();
  // Refresh cart page
  displayCartItems();
}

// Calculate cart total
function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Display cart items on cart page
function displayCartItems() {
  let cartItemsElem = document.getElementById("cart-items");
  // Clear cart items table
  cartItemsElem.innerHTML = "";
  // Add items to cart items table
  cartItems.forEach((item, index) => {
    let row = document.createElement("tr");
    let nameCol = document.createElement("td");
    let priceCol = document.createElement("td");
    let quantityCol = document.createElement("td");
    let subtotalCol = document.createElement("td");
    let removeCol = document.createElement("td");
    let removeBtn = document.createElement("button");
    nameCol.textContent = item.name;
    priceCol.textContent = "$" + item.price;
    quantityCol.textContent = item.quantity;
    subtotalCol.textContent = "$" + item.price * item.quantity;
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.addEventListener("click", () => removeCartItem(index));
    removeCol.appendChild(removeBtn);
    row.appendChild(nameCol);
    row.appendChild(priceCol);
    row.appendChild(quantityCol);
    row.appendChild(subtotalCol);
    row.appendChild(removeCol);
    cartItemsElem.appendChild(row);
  });
  // Update cart total
  let cartTotalElem = document.getElementById("cart-total");
  cartTotalElem.textContent = "$" + calculateCartTotal();
}

// Initialize cart icon and count
updateCartIcon();

// Add click event listener to add-to-cart buttons
let addToCartBtns = document.querySelectorAll(".add-to-cart");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let name = btn.getAttribute("data-name");
    let price = parseFloat(btn.getAttribute("data-price"));
    addToCart(name, price);
  });
});

// Display cart items on cart page
displayCartItems();


// blog display
function showMore(event) {
  const post = event.target.parentNode;
  const readMore = post.querySelector('.read-more');

  if (readMore.style.display === 'none') {
    readMore.style.display = 'block';
    event.target.textContent = 'Read less';
  } else {
    readMore.style.display = 'none';
    event.target.textContent = 'Read more';
  }
}


//menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
});

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


  // password toggle
  function myToggle() {
    const code = document.getElementById('password');
    if (code.type === 'password') {
      code.type = 'text';
    } else {
      code.type = 'password'
    }
  }

  // Get the modal
var modal = document.querySelector('.modal-dialog');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


