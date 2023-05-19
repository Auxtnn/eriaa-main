const express = require('express');
const router = express.Router();
const adminController = require ('../controllers/adminController')


router.get('/admin', adminController.getAdmin)
router.get('/admin-login', adminController.getLogin)



module.exports = router;
