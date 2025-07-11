const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  zone: String, // optional, useful for auto-assignment
  role: { type: String, default: 'delivery' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DeliveryAgent', deliveryAgentSchema);
