const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'HabitMind Premium Access',
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/payment-cancel',
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
