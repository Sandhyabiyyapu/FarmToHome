const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryAgent' },
  quantity: Number,
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['processing', 'ready-for-pickup', 'in-transit', 'delivered'],
    default: 'processing'
  },
  deliveryAddress: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
