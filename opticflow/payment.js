const stripe = Stripe("your_publishable_key_here"); // Replace with your Stripe public key

document.addEventListener("DOMContentLoaded", () => {
    const paymentTotal = document.getElementById("payment-total");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });

    paymentTotal.textContent = formatter.format(total);

    document.getElementById("pay-now").addEventListener("click", async () => {
        const response = await fetch("/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart })
        });

        const session = await response.json();
        stripe.redirectToCheckout({ sessionId: session.id });
    });
});
