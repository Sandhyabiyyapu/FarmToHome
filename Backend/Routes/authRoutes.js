const express = require('express');
const router = express.Router();
const { registerFarmer, upload } = require('../Controllers/authController');

router.post('/farmer/register', upload.array('farmImages', 5), registerFarmer);

module.exports = router;
