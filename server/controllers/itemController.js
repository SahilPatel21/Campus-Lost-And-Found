// controllers/itemController.js
const asyncHandler = require('express-async-handler');
const Item = require('../models/Item');

// @desc    Get all items with search & filters
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const { search, type, status, category } = req.query;
  const filter = {};

  // Case-insensitive title search
  if (search && search.trim() !== '') {
    filter.title = { $regex: search.trim(), $options: 'i' };
  }

  // Filter by item type (Lost / Found)
  if (type && type !== 'All') {
    filter.type = type;
  }

  // Filter by status (Open / Returned)
  if (status && status !== 'All') {
    filter.status = status;
  }

  // Filter by category
  if (category && category !== 'All') {
    filter.category = category;
  }

  const items = await Item.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Item not found.');
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Create new item
// @route   POST /api/items
// @access  Public (Optional auth)
const createItem = asyncHandler(async (req, res) => {
  const { title, description, category, type, location, date, contact, imageUrl, status } =
    req.body;

  if (!title || !description || !category || !type || !location || !date || !contact) {
    res.status(400);
    throw new Error('Please fill in all required fields.');
  }

  const newItem = await Item.create({
    title: title.trim(),
    description: description.trim(),
    category,
    type,
    location: location.trim(),
    date,
    contact: contact.trim(),
    imageUrl: imageUrl || '',
    status: status || 'Open',
    user: req.user ? req.user._id : null,
    reportedBy: req.user ? req.user.name : (req.body.reportedBy || 'Campus Member'),
  });

  res.status(201).json({
    success: true,
    message: 'Item reported successfully!',
    data: newItem,
  });
});

// @desc    Update item by ID
// @route   PUT /api/items/:id
// @access  Public
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Item not found.');
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Item updated successfully!',
    data: updatedItem,
  });
});

// @desc    Delete item by ID
// @route   DELETE /api/items/:id
// @access  Public
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Item not found.');
  }

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Item deleted successfully!',
    data: item,
  });
});

// @desc    Get items reported by logged-in user
// @route   GET /api/items/my-items
// @access  Private
const getMyItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
});

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
};
