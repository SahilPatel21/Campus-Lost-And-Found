// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId, role = 'STUDENT') => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'campus_secret_key_2024_lost_found_portal',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
