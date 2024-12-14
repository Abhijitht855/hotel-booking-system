import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe Secret Key

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  const { amount, currency = "usd" } = req.body;

  try {
    // Validate request body
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe requires the amount in cents
      currency,
      automatic_payment_methods: { enabled: true }, // Enable payment methods
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Payment intent creation failed", error: error.message });
  }
};
