require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'AI Chatbot Search Platform API is running 🚀',
  });
});

async function connectToMongoDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-chatbot'
  );

  console.log('✅ Connected to MongoDB');
}

// Connect to MongoDB before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);

    res.status(500).json({
      message: 'Database connection failed',
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Export Express app for Vercel
module.exports = app;

// Run as a normal server during local development
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
