require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "gbp",
                    product_data: { name: item.name, images: [item.image] },
                    unit_amount: Math.round(item.price * 100), // Convert to pence
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "https://yourwebsite.com/success.html",
            cancel_url: "https://yourwebsite.com/cart.html",
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
