const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const Farmer = require('../Models/Farmer');
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
