// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Cart Items
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartContainer.innerHTML = ""; // Clear current cart items

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>£${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: £${totalPrice.toFixed(2)}`;
}

// Function to Remove Individual Items
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
    displayCart(); // Refresh cart
}

// Function to Clear Cart
function clearCart() {
    cart = []; // Empty the cart array
    localStorage.removeItem("cart"); // Clear from localStorage
    displayCart(); // Refresh the cart display
}

// Event Listener for Clear Cart Button
document.addEventListener("DOMContentLoaded", () => {
    displayCart(); // Load cart when page loads

    // Attach event listener to the Clear Cart button
    const clearCartBtn = document.getElementById("clear-cart");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }
});
