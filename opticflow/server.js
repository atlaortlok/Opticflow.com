const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe("your_secret_key_here"); // Replace with your Stripe secret key

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    const { cart } = req.body;

    const lineItems = cart.map((item) => ({
        price_data: {
            currency: "gbp",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100) // Convert to pence
        },
        quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://yourwebsite.com/success.html",
        cancel_url: "https://yourwebsite.com/cart.html"
    });

    res.json({ id: session.id });
});

app.listen(3000, () => console.log("Server running on port 3000"));
