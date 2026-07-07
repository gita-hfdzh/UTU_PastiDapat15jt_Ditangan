require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const apiRoutes = require('./backend/routes/api');

// Connect to MongoDB
// Only connect if MONGO_URI is provided (so it doesn't crash if they haven't set it up yet)
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log("No MONGO_URI found in .env, skipping database connection for now.");
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('LAMURI API is running...');
});

// Fallback for not found
app.use((req, res) => {
  res.status(404).json({ message: 'API Endpoint Not Found' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`LAMURI Backend Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
