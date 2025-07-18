const User = require('../Models/User');
const Farmer = require('../Models/Farmer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await newUser.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Register Farmer
exports.registerFarmer = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer)
      return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    // Build URLs for uploaded files
    let farmImages = [];
    if (req.files && req.files.length > 0) {
      farmImages = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    }
    const newFarmer = new Farmer({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      farmImages,
      // role and isApproved are set by default in schema
    });
    await newFarmer.save();
    res.status(201).json({ message: "Farmer registered successfully" });
  } catch (err) {
    console.error("Farmer Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login function for customer and farmer
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === 'customer') {
      user = await User.findOne({ email, role });
    } else if (role === 'farmer') {
      user = await Farmer.findOne({ email, role });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or not authorized" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials or not authorized" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
