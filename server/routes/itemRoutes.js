// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
} = require('../controllers/itemController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');

router.get('/my-items', protect, getMyItems);
router.route('/').get(getItems).post(optionalProtect, createItem);
router.route('/:id').get(getItemById).put(updateItem).delete(deleteItem);

module.exports = router;
