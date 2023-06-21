const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdminLoggedIn } = require('../controllers/adminController');


router.get('/admin/dashboard', ensureAdminLoggedIn, adminController.getAdmin);
router.get('/admin/login', adminController.getAdminLogin);
router.post('/admin/login', adminController.postAdminLogin);
router.delete('/admin/logout', adminController.getAdminLogout);

module.exports = router;
