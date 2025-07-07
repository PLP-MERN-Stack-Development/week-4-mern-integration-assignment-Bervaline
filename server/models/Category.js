// Category.js - Mongoose model for blog post categories

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

// Virtual for post count
CategorySchema.virtual('postCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
  count: true,
});

module.exports = mongoose.model('Category', CategorySchema); 