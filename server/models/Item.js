// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item title/name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an item description'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide an item category'],
      trim: true,
      default: 'Other',
    },
    type: {
      type: String,
      required: [true, 'Please specify if the item is Lost or Found'],
      enum: {
        values: ['Lost', 'Found'],
        message: 'Type must be either Lost or Found',
      },
    },
    location: {
      type: String,
      required: [true, 'Please provide the campus location where the item was lost or found'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide the date when the item was lost or found'],
    },
    contact: {
      type: String,
      required: [true, 'Please provide contact information (phone, email, or room)'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Open', 'Returned'],
        message: 'Status must be either Open or Returned',
      },
      default: 'Open',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reportedBy: {
      type: String,
      default: 'Campus Member',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
