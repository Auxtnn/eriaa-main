const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');


router.get('/reservation/thank-you', reservationController.getThankYouReservation)
router.get ('/reservation', reservationController.getBooking);
router.post ('/reservation', reservationController.postBooking);


module.exports = router;