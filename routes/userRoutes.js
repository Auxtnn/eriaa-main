const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

const { protect } = require("../middleware/authMiddleware");


router.get('/register', userController.registerUser_get)
router.post('/register', userController.registerUser_post)

router.get('/login', userController.loginUserGet)
router.post('/login', userController.loginUser)

router.get('/me', protect, userController.getMe)


module.exports = router;