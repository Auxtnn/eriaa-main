const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const subscribeController = require('../controllers/subscribeController')


router.get ('/blog', mainController.getBlog);

router.get ('/menu', mainController.getMenu);
router.get ('/about-us', mainController.getAbout);

router.get ('/cart', mainController.getCart);
router.get ('/', mainController.getIndex);


router.get('/contact-us/thank-you', mainController.getThankYouContact)

router.post ('/subscribe', subscribeController.postSubscribe);
// router.post ('/unsubscribe?email', subscribeController.postUnubscribe);


module.exports = router