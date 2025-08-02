const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const EarningsController = require('../../Controllers/Farmer/EarningsController');

router.get('/earnings', auth, EarningsController.getEarnings);

module.exports = router; 