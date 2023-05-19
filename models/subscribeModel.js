//this is meant to be the model for sending newsletter

const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  joined: {
    type: Date,
    default: new Date(),
  },
  
});

module.exports = mongoose.model('Subscriber', subscriberSchema)