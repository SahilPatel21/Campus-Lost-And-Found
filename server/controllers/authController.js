// controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { isValidEmail, isValidPassword } = require('../utils/validators');

// @desc    Register a new student or faculty account
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, phone, role, campusId } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required.');
  }

  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error('Please enter a valid email address.');
  }

  if (!isValidPassword(password)) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long.');
  }

  if (confirmPassword && password !== confirmPassword) {
    res.status(400);
    throw new Error('Password and confirm password do not match.');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    res.status(400);
    throw new Error('An account with this email already exists.');
  }

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    phone: phone ? phone.trim() : '',
    role: role || 'STUDENT',
    campusId: campusId ? campusId.trim() : '',
  });

  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    token,
    user: user.toJSON(),
  });
});

// @desc    Log in an existing user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  if (!user.isActive) {
    res.status(401);
    throw new Error('This account has been deactivated.');
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully!',
    token,
    user: user.toJSON(),
  });
});

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.toJSON(),
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
