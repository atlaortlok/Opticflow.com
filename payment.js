const stripe = Stripe("pk_test_51QwHZJIyiyXVGNwdrhjQqIZpj8q6iE88NSb9exxYePcuch2hyo4oDSAaSlwnvHr299CvwN9YLa4wqEscCDX59iZW00cNePxBnL"); // Replace with your Stripe public key

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
