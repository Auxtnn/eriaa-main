// Create checkout session
async function createCheckoutSession() {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
  
      const session = await response.json();
  
      if (!session.id) {
        throw new Error('Invalid session ID received');
      }
  
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Handle the error, show an error message, or perform any necessary actions
    }
  }
  
  // Event listener for the checkout button
  document.getElementById('checkout-button').addEventListener('click', async () => {
    try {
       // Check if the cart is empty
    if (cartItems.length === 0) {
      alert('Cart is empty. Please add items to your cart before checking out.');
      return;
    }

      // Create the checkout session
      const session = await createCheckoutSession();
  
      if (session) {
        // Redirect to Stripe Checkout
        const stripe = Stripe('pk_test_51Mutt5GrEhbP0XAkFo0JtcSlrBWPBPEDlOZIhVBg0BlP2dCkUQar9Jf3XrpVKuS7zbE8IBtxdghDiaSXWiCp6xyo00L60KbT9H');
        stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle the error, show an error message, or perform any necessary actions
    }
  });
  
  