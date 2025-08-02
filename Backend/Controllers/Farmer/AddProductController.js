const Product = require('../../Models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, category, description, price, quantity, unit, availableUntil } = req.body;
    const product = new Product({
      farmerId: req.user.id,
      name,
      category,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit,
      availableUntil: new Date(availableUntil),
      image: req.file ? req.file.filename : null
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 