const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');

router.get ('/book-a-table', reservationController.getBooking);

router.post ('/book-a-table', reservationController.postBooking);


module.exports = router;