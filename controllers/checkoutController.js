exports.successCheckout = async (req, res) => {
    res.render('paymentSuccess')
}

exports.cancelCheckout = async (req, res) => {
    res.render('cancelPayment')
}

const stripe = require('stripe')('sk_test_51Mutt5GrEhbP0XAkblkC3xA7jBiuKutAaMtNxuxWBlitho7ATM1jRSXTTHMTeu0PVVfN4VEactlPs2hT7wbjrWtz003rTm5a5i');

// Controller for creating a checkout session
exports.createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Create line items for the products in the cart
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Calculate cart total
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5000/checkout/success', // URL to redirect to on successful payment
      cancel_url: 'http://localhost:5000/checkout/cancel', // URL to redirect to if payment is canceled
      metadata: {
        cartItems: JSON.stringify(cartItems),
        cartTotal: cartTotal.toFixed(2),
      },
    });
   
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
