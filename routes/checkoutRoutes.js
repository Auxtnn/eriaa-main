const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');


router.get('/checkout/success', checkoutController.successCheckout)
router.get('/checkout/cancel', checkoutController.cancelCheckout)
router.post('/create-checkout-session', checkoutController.createCheckoutSession)


module.exports = router