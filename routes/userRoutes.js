const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

const { protect } = require("../middleware/authMiddleware");


router.get('/user', userController.userForm)
router.post('/register', userController.registerUser_post)


router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser);
router.get('/me', protect, userController.getMe)


module.exports = router;