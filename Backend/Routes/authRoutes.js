const express = require('express');
const router = express.Router();
const { registerCustomer,registerFarmer } = require('../Controllers/authController');
router.post('/register-customer', registerCustomer);
router.post('/register-farmer', registerFarmer);
module.exports = router;
