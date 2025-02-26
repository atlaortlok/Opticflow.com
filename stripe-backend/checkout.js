document.getElementById("checkout-btn").addEventListener("click", async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
    });

    const data = await response.json();
    if (data.url) {
        window.location.href = data.url;
    } else {
        alert("Error: " + data.error);
    }
});
