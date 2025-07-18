const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  location: String,

  farmImages: [String],

  isApproved: { type: Boolean, default: false },
  role: { type: String, default: 'farmer' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
