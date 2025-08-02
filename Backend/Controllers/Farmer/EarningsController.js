const Order = require('../../Models/Order');

exports.getEarnings = async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user.id, paymentStatus: 'paid' });
    const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    res.json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 