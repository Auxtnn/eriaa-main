// this meant to be the model for receiving table reservation and sending mail


const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// Define the reservation schema
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
      },

      email: {
        type: String,
        required:true,
      },

      phone: {
        type: Number,
        required:true,
      },
      date: {
        type: Date,
        required:true,
      },
      time: {
        type: String,
        required:true,
      },

      guests: {
        type: Number,
        required:true,
      },

      message: {
        type: String,
      },
      joined: {
        type: Date,
        default: new Date(),
      },
      
  });
  
  // Create the reservation model
  const Reservation = mongoose.model('Reservation', reservationSchema);
  module.exports = Reservation
  