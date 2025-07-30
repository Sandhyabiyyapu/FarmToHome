const express = require('express');
const router = express.Router();
const { registerCustomer,registerFarmer,adminLogin } = require('../Controllers/authController');
router.post('/register-customer', registerCustomer);
router.post('/register-farmer', registerFarmer);
router.post('/admin-login', adminLogin);
module.exports = router;
