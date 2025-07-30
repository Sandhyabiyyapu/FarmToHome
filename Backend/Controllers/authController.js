const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const Farmer = require('../Models/Farmer');
const Admin = require('../Models/Admin');
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

exports.registerFarmer = async (req, res) => {
  try {
    const { name, email, password, phone, location, farmImages } = req.body;

    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer)
      return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = new Farmer({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      farmImages: Array.isArray(farmImages) ? farmImages : [],
      // isApproved, role, createdAt use schema defaults
    });
    await newFarmer.save();
    res.status(201).json({ message: "Farmer registered successfully. Awaiting admin approval." });
  } catch (err) {
    console.error("Farmer Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.adminLogin=async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Token (optional if you’re using auth middleware later)
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
