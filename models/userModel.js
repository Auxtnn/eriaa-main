const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']

  },
  matchedPassword: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// fire a function before doc saved to db
// userSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.matchedPassword = await bcrypt.hash(this.matchedPassword, salt);
//   next();
// });

// static method to login user
// userSchema.statics.loginUser = async function(email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email');
// };


const User = mongoose.model('User', userSchema);
module.exports = User;