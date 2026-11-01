// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { uploadImageHandler } = require('../controllers/uploadController');

router.post('/', uploadImageHandler);

module.exports = router;
