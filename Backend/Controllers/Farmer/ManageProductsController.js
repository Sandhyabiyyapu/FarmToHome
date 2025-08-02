const Product = require('../../Models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, farmerId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { quantity, availableUntil } = req.body;
    const product = await Product.findOne({ _id: req.params.id, farmerId: req.user.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Only allow updating quantity and availableUntil
    product.quantity = parseInt(quantity);
    product.availableUntil = new Date(availableUntil);
    
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, farmerId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 