// server.js
// Application entry point for Campus Lost and Found Portal API
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static file serving for uploaded item photos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check / root route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Lost and Found Portal API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Campus Lost and Found Portal API',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
      items: {
        getAll: 'GET /api/items',
        getSingle: 'GET /api/items/:id',
        create: 'POST /api/items',
        update: 'PUT /api/items/:id',
        delete: 'DELETE /api/items/:id',
        myItems: 'GET /api/items/my-items',
      },
      upload: 'POST /api/upload',
    },
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// 404 & Centralized Error Handler (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`📦 REST API Base URL: http://localhost:${PORT}/api/items`);
});
