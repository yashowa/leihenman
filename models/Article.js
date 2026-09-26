const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

  category: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  depositPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imageUrl: { type: String},

}, {
  timestamps: true,
});

module.exports = mongoose.model('Article', articleSchema);
