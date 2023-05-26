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
exports.registerUser = (req, res) => {
  res.render('userSignup')
}

// @desc    Register new user
// @route   POST /
// @access  Public

exports.oregisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // if (!name || !email || !password) {
  //   res.status(400)
  //   throw new Error('Please add all fields')
  // }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  try {
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // checking if user exists
  // if (user) {
  //   res.status(201).json({
  //     _id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     token: generateToken(user._id),
  //   })
  // } else {
  //   res.status(400)
  //   throw new Error('Invalid user data')
  // }

  // jwt session loader
  const token = createToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  res.status(201).json({ user: user._id }); 

  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
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
