const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerCustomer, registerFarmer, login } = require('../Controllers/authController');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/register-customer', registerCustomer);
router.post('/register-farmer', upload.array('farmImages'), registerFarmer);
router.post('/login', login);
module.exports = router;
