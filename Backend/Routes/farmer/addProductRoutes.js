const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../../Middleware/auth');
const AddProductController = require('../../Controllers/Farmer/AddProductController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/products', auth, upload.single('image'), AddProductController.addProduct);

module.exports = router; 