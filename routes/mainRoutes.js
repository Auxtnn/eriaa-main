const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const subscribeController = require('../controllers/subscribeController')



router.get ('/blog', mainController.getBlog);
router.get ('/menu', mainController.getMenu);
router.get ('/about-us', mainController.getAbout);

router.get ('/cart', mainController.getCart);
router.get ('/contact-us', mainController.getContact);
router.get ('/', mainController.getIndex);

router.get('/thank-you', mainController.getThankYou )

router.post ('/subscribe', subscribeController.postSubscribe);

module.exports = router