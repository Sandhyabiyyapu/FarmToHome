const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  location: String,

  // Store uploaded image URLs (handled automatically on backend)
  farmImages: [String], // You will push image URLs here after upload

  isApproved: { type: Boolean, default: false },
  role: { type: String, default: 'farmer' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
