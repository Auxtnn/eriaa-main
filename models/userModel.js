const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  
  joined: {
    type: Date,
    default: new Date(),
  },
  
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('User', userSchema)