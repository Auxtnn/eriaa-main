const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
require('dotenv').config();
let formSubmitted = false;
// render login page
exports.userForm = (req, res) => {
  res.render('user')
};

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // Handling validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Handling incorrect email error
  if (err.message === 'incorrect email') {
    errors.email = 'Invalid email or email not registered';
  }

  // Handling incorrect password error
  if (err.message === 'incorrect password') {
    errors.password = 'Invalid password';
  }

  // Handling duplicate email error
  if (err.code === 11000 && err.keyValue.email) {
    errors.email = 'Email is already registered';
  }

  return errors;
};


// Generate JWT
const maxAge = 3 * 24 * 60 * 60
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}


// @desc    Register new user
// @route   POST /register
// @access  Public

exports.registerUser_post = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

 // Check if password and confirmPassword match
 if (password !== confirmPassword) {
  res.status(400);
  throw new Error("Passwords don't match");
}
  

  // Hash password
  const salt = await bcrypt.genSalt(10)
  console.log('matchedPassword:', password);
  console.log('salt:', salt);
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  try {
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  res.redirect('/login')

  // jwt session loader
  // const token = createToken(user._id);
  // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  // res.status(201).json({ user: user._id }); 

  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    formSubmitted = true;
  }

 
  
})


// @desc    Authenticate a user
// @route   POST /login
// @access  Public


exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password) 
     
      if (!passwordMatch) {
        return res.status(401).send('Incorrect Password') 
    }


    
    // Generate JWT token
    const token = generateToken(user._id);

    // Set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // req.session.user = user

    // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(200).json({ user: user._id });

    // on success redirect to homepage
    res.redirect('/');

  } catch(err) {

    res.status(500).json({
      success: false,
      message: 'Error occurred while logging in',
      error: err.message
    });
  }

})

// @desc    Logout user
// @route   GET /logout
// @access  Private

exports.logoutUser = asyncHandler(async (req, res) => {
  // Clear the user session or token
  req.session.destroy();

  // Redirect the user to the desired page after logout
  res.redirect('/');
});

// @desc    Get user data
// @route   GET /me
// @access  Privatee
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

