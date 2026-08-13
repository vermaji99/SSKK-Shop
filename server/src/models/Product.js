import mongoose from 'mongoose';
import { slugify } from '../utils/helpers.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (value) {
          return !value || value < this.price;
        },
        message: 'Discount price must be less than the original price',
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
      min: [0, 'Stock cannot be negative'],
    },
    goldPurity: {
      type: String,
      trim: true,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
    },
    material: {
      type: String,
      trim: true,
    },
    gemstones: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name);
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
