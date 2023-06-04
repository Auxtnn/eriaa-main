const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
require('dotenv').config();

// render login page
exports.loginUserGet = (req, res) => {
  res.render('userLogin')
};

// check for errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' }

  // handling incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Your email is unregistered';
  }
  // for existing email replication
  if (err.code === 11000) {
    errors.email = 'This email is registered already';
    return errors;
  }

  // handling password error
  if (err.message === 'incorrect password') {
    errors.message = 'The password is incorrect';
  }

  // Handling validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


// Generate JWT
const maxAge = 3 * 24 * 60 * 60
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}

// Rendering signup Page
exports.registerUser_get = (req, res) => {
  res.render('userSignup')
}


// @desc    Register new user
// @route   POST /
// @access  Public

exports.registerUser_post = asyncHandler(async (req, res) => {
  const { name, email, matchedPassword } = req.body

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(matchedPassword, salt)

  // Create user
  try {
  const user = await User.create({
    name,
    email,
    matchedPassword: hashedPassword,
  })

  // jwt session loader
  // const token = createToken(user._id);
  // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  // res.status(201).json({ user: user._id }); 

  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  res.redirect('/login');
  
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public


exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.matchedPassword) 
     
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect Password'
        });
      
    }

    // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(200).json({ user: user._id });

    // on success redirect to homepage
    res.redirect('/')

  } catch(err) {

    res.status(500).json({
      success: false,
      message: 'Error occurred while logging in',
      error: error.message
    });
  }

})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Privatee
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})



// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
// }
