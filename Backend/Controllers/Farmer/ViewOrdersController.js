const Order = require('../../Models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user.id })
      .populate('customerId', 'name email')
      .populate('productId', 'name price')
      .populate('deliveryAgentId', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findOne({ _id: req.params.id, farmerId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 