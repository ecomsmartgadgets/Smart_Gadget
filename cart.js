// cart.js

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Get references to DOM elements
    const cartItemsContainer = document.getElementById("cart__items"); // Container for cart items
    const cartTotalElement = document.getElementById("cart__total"); // Cart total in the header
    const cartSubtotalElement = document.getElementById("cart__subtotal"); // Subtotal in the cart
    const cartShippingElement = document.getElementById("cart__shipping"); // Shipping cost
    const cartTotalPriceElement = document.getElementById("cart__total"); // Total price
  
    // Function to display cart items
    const displayCartItems = () => {
      // If the cart is empty, show a message
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
        return;
      }
  
      // Generate HTML for each cart item
      let cartHTML = cart
        .map((item) => {
          return `
            <tr>
              <td class="product__thumbnail">
                <a href="#">
                  <img src="${item.image}" alt="${item.title}">
                </a>
              </td>
              <td class="product__name">
                <a href="#">${item.title}</a>
                <br><br>
                <small>${item.category}</small>
              </td>
              <td class="product__price">
                <div class="price">
                  <span class="new__price">$${item.price}</span>
                </div>
              </td>
              <td class="product__quantity">
                <div class="input-counter">
                  <div>
                    <span class="minus-btn">
                      <svg>
                        <use xlink:href="./images/sprite.svg#icon-minus"></use>
                      </svg>
                    </span>
                    <input type="text" min="1" value="${item.quantity}" max="10" class="counter-btn">
                    <span class="plus-btn">
                      <svg>
                        <use xlink:href="./images/sprite.svg#icon-plus"></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </td>
              <td class="product__subtotal">
                <div class="price">
                  <span class="new__price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <a href="#" class="remove__cart-item" data-id="${item.id}">
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-trash"></use>
                  </svg>
                </a>
              </td>
            </tr>
          `;
        })
        .join("");
  
      // Insert the generated HTML into the cart items container
      cartItemsContainer.innerHTML = cartHTML;
    };
  
    // Function to calculate totals (subtotal, shipping, total)
    const calculateTotals = () => {
      // Calculate subtotal by summing up the price * quantity of each item
      const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Check if shipping is selected (add $7 if selected)
      const shipping = document.querySelector(".check__shipping input").checked ? 7 : 0;
  
      // Calculate total by adding subtotal and shipping
      const total = subtotal + shipping;
  
      // Update the DOM with the calculated values
      cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      cartShippingElement.textContent = `$${shipping.toFixed(2)}`;
      cartTotalPriceElement.textContent = `$${total.toFixed(2)}`;
    };
  
    // Function to update the cart total in the header
    const updateCartTotal = () => {
      // Calculate the total number of items in the cart
      const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);
  
      // Update the cart icon in the header
      cartTotalElement.textContent = cartTotal;
    };
  
    // Function to remove an item from the cart
    const removeCartItem = (id) => {
      // Filter out the item with the given ID
      cart = cart.filter((item) => item.id !== id);
  
      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Refresh the cart display, totals, and header
      displayCartItems();
      calculateTotals();
      updateCartTotal();
    };
  
    // Event listener for remove buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest(".remove__cart-item")) {
        e.preventDefault(); // Prevent default link behavior
        const productId = e.target.closest(".remove__cart-item").dataset.id; // Get the product ID
        removeCartItem(productId); // Remove the item from the cart
      }
    });
  
    // Event listener for shipping checkbox
    document.querySelector(".check__shipping input").addEventListener("change", calculateTotals);
  
    // Initialize the cart page
    displayCartItems(); // Display cart items
    calculateTotals(); // Calculate and display totals
    updateCartTotal(); // Update the cart icon in the header
  });