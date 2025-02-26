document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    loadCart(); // Load saved cart items when the page loads
});

const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
});

const products = [
    { name: "Red T-shirt", price: 25, },
    { name: "Blue T-shirt", price: 25, },
    { name: "Yellow T-shirt", price: 25, }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        let productCard = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name} - ${formatter.format(product.price)}</p>
                <button class="add-to-cart" data-index="${index}">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            addToCart(index);
        });
    });
}

function addToCart(index) {
    const product = products[index];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
    alert(`${product.name} added to cart for ${formatter.format(product.price)}!`);
    loadCart();
}

function loadCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
        total += product.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${product.name} - ${formatter.format(product.price)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = formatter.format(total);
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    loadCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
