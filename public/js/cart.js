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
    cartItems.push({ name: name, price: price, quantity: 1, added: true });
  }

  // Save cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Update cart icon and count
  updateCartIcon();

  // Show "Added" message for 1 second
  event.target.textContent = "Added";
  event.target.disabled = true;
  setTimeout(function () {
    event.target.textContent = "Add to Cart";
    event.target.disabled = false;
  }, 1000);

  // Display cart items on cart page
  displayCartItems();
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
    let removeIcon = document.createElement("i");
    let plusBtn = document.createElement("button");
    let minusBtn = document.createElement("button");

    nameCol.textContent = item.name;
    priceCol.textContent = "CA$" + item.price;
    quantityCol.textContent = item.quantity;
    subtotalCol.textContent = "CA$" + item.price * item.quantity;
    removeIcon.classList.add("fas", "fa-trash-alt", "dustbin-icon");
    removeBtn.appendChild(removeIcon);
    removeBtn.addEventListener("click", () => removeCartItem(index));

    plusBtn.textContent = "+";
    plusBtn.classList.add("adjust-quantity", "plus");
    plusBtn.classList.add("btn-spacing");
    plusBtn.addEventListener("click", () => {
      item.quantity++;
      displayCartItems();
      updateCartIcon();
    });

    minusBtn.textContent = "-";
    minusBtn.classList.add("adjust-quantity", "minus");
    minusBtn.classList.add("btn-spacing");
    minusBtn.addEventListener("click", () => {
      event.preventDefault();
      if (item.quantity > 1) {
        item.quantity--;
        displayCartItems();
        updateCartIcon();
      }
    });

    removeCol.appendChild(removeBtn);
    quantityCol.appendChild(minusBtn);
    quantityCol.appendChild(plusBtn);
    row.appendChild(nameCol);
    row.appendChild(priceCol);
    row.appendChild(quantityCol);
    row.appendChild(subtotalCol);
    row.appendChild(removeCol);
    cartItemsElem.appendChild(row);
  });

  // Update cart total
  let cartTotalElem = document.getElementById("cart-total");
  cartTotalElem.textContent = "CA$" + calculateCartTotal();
}

// Initialize cart icon and count
updateCartIcon();

document.addEventListener("DOMContentLoaded", function() {
  // Add click event listener to add-to-cart buttons
  let addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let name = btn.getAttribute("data-name");
      let price = parseFloat(btn.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
});

// Display cart items on cart page
displayCartItems();