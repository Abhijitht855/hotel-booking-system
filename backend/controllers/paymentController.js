import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  try {
    const { amount, token } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency: "usd",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: { token },
      },
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
