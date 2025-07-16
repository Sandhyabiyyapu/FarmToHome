// backend/server.js
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./Routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Base Route
app.get('/', (req, res) => {
  res.send("🌿 FarmToHome API is working!");
});

// Import & Use Routes
const authRoutes = require('./Routes/authRoutes');
// Add more routes like farmerRoutes, adminRoutes, etc. as you build
app.use('/api/auth', authRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

