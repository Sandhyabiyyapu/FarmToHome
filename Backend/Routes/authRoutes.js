const express = require('express');
const router = express.Router();
const { registerCustomer } = require('../Controllers/authController');
router.post('/register-customer', registerCustomer);
module.exports = router;
