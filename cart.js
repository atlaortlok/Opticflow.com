// Initialize the cart as an empty array
let cart = [];

// Function to update the cart display (for view cart page)
function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Clear the current cart display

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    // Loop through the cart array and display each item
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <p>${item.name}</p>
            <p>${item.price}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update the cart count and total
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;

    // Toggle the visibility of the cart display
    document.getElementById("cart-items-count").textContent = cart.length;
}

// Function to add an item to the cart
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Function to view the cart (redirect to cart page)
function viewCart() {
    window.location.href = "/cart"; // Assuming you have a cart page
}

// Stripe Checkout (integration)
document.getElementById("stripe-checkout").addEventListener("click", function() {
    // Make sure your backend creates a checkout session and returns the session ID
    fetch("/create-checkout-session", {
        method: "POST",
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(sessionId) {
        var stripe = Stripe("pk_test_51QwHZJIyiyXVGNwdrhjQqIZpj8q6iE88NSb9exxYePcuch2hyo4oDSAaSlwnvHr299CvwN9YLa4wqEscCDX59iZW00cNePxBnL");  // Replace with your actual Stripe public key
        stripe.redirectToCheckout({ sessionId: sessionId }).then(function(result) {
            // Handle any errors with the redirect (if any)
            if (result.error) {
                alert(result.error.message);
            }
        });
    })
    .catch(function(error) {
        console.error("Error redirecting to checkout:", error);
    });
});

// Initialize the cart on page load (if items are stored in localStorage, for example)
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCart();
    }
});

// Example of adding products to the cart when the "Add to Cart" button is clicked
const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {
    button.addEventListener("click", function() {
        const product = {
            name: this.getAttribute("data-name"),
            price: this.getAttribute("data-price"),
            image: this.getAttribute("data-image")
        };
        addToCart(product);
    });
});

// Optional: Save the cart to localStorage if you want the cart to persist after page reload
window.addEventListener("beforeunload", function() {
    localStorage.setItem("cart", JSON.stringify(cart));
});
