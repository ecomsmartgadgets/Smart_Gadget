document.addEventListener("DOMContentLoaded", () => {
    updateCart();

    // Proceed to checkout button
    const proceedButton = document.getElementById("checkout-button");
    if (proceedButton) {
        proceedButton.addEventListener("click", proceedToCheckout);
    }
});

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let subtotalContainer = document.getElementById("subtotal-price");
    let totalPriceContainer = document.getElementById("total-price");
    const shippingCost = 1000.00; // Fixed shipping cost

    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalContainer.textContent = "$0.00";
        totalPriceContainer.textContent = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-index="${index}">
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        subtotal += item.price * item.quantity;
    });

    // Update subtotal and total (subtotal + shipping)
    subtotalContainer.textContent = `$${subtotal.toFixed(2)}`;
    totalPriceContainer.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

    document.querySelectorAll(".cart-item-quantity").forEach(input => {
        input.addEventListener("change", updateQuantity);
    });
    
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", removeItem);
    });
}

function updateQuantity(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.dataset.index;
    let newQuantity = parseInt(event.target.value);

    if (newQuantity < 1) {
        newQuantity = 1;
    }
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeItem(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Proceed to checkout function
function proceedToCheckout() {
    alert("I am glad shopping with us!");
    localStorage.removeItem("cart"); // Clear cart after checkout
    updateCart();
}
