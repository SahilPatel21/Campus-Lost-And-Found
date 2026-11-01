// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized - please log in.');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'campus_secret_key_2024_lost_found_portal'
    );
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error('Your session has expired. Please log in again.');
    }
    throw new Error('Not authorized - invalid authentication token.');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error('Not authorized - user no longer exists.');
  }
  if (!user.isActive) {
    res.status(401);
    throw new Error('This account has been deactivated.');
  }

  req.user = user;
  next();
});

const optionalProtect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'campus_secret_key_2024_lost_found_portal'
      );
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    } catch (err) {
      // Token invalid or expired - proceed without user
    }
  }
  next();
});

module.exports = { protect, optionalProtect };
