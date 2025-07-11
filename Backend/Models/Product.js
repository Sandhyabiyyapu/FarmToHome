const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
  name: String,
  category: String,
  description: String,
  image: String,
  price: Number,
  quantity: Number,
  unit: String, // e.g., kg, litre
  availableUntil: Date,
  status: { type: String, enum: ['pending', 'approved', 'expired'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
