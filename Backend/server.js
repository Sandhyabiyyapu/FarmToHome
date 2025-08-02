// // // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const authRoutes = require('./Routes/authRoutes');

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);

// // MongoDB Atlas Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Atlas connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Base Route
// app.get('/', (req, res) => {
//   res.send("🌿 FarmToHome API is working!");
// });


// // Add this after app initialization and before app.listen
// // const authRoutes = require('./Routes/authRoutes');
// app.use('/api/auth', authRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();
const authRoutes = require('./Routes/authRoutes');
const farmerRoutes = require('./Routes/farmerRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/uploads', express.static('uploads'));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Base API route
app.get('/', (req, res) => {
  res.send("🌿 FarmToHome API is working!");
});

// Start server
const PORT =5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
