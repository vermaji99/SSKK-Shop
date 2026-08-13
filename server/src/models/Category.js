import mongoose from 'mongoose';
import { slugify } from '../utils/helpers.js';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Category name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name);
  next();
});

categorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
