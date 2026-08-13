import { asyncHandler, ApiError, generateUniqueSlug } from '../utils/helpers.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { uploadMultipleToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const {
    category,
    featured,
    bestseller,
    search,
    keyword,
    goldPurity,
    minPrice,
    maxPrice,
    page = 1,
    limit = 12,
    sort = '-createdAt',
  } = req.query;

  const query = {};

  if (category) {
    if (mongoose.Types.ObjectId.isValid(category)) {
      query.category = category;
    } else {
      const cat = await Category.findOne({
        $or: [{ slug: category }, { name: new RegExp(`^${category}$`, 'i') }],
      });
      if (cat) {
        query.category = cat._id;
      }
    }
  }

  if (goldPurity) {
    query.goldPurity = goldPurity;
  }

  if (featured === 'true') {
    query.featured = true;
  }

  if (bestseller === 'true') {
    query.bestseller = true;
  }

  const searchTerm = search || keyword;
  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { material: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const products = await Product.find(query)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    data: products,
  });
});

export const getProductBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug }).populate(
    'category',
    'name slug'
  );

  if (!product) {
    return next(new ApiError(404, `Product not found with slug: ${slug}`));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate('category', 'name slug');

  if (!product) {
    return next(new ApiError(404, `Product not found with id: ${id}`));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const createProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),
  body('category').notEmpty().withMessage('Product category is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((v) => v >= 0)
    .withMessage('Price cannot be negative'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadedImages = await uploadMultipleToCloudinary(req.files, 'sskk/products');
      images = uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    } else if (req.body.images && Array.isArray(req.body.images)) {
      images = req.body.images.map((img) =>
        typeof img === 'string'
          ? { url: img, public_id: `manual-${Date.now()}-${Math.random()}` }
          : img
      );
    }

    const productData = {
      ...req.body,
      images,
    };

    const slug = await generateUniqueSlug(Product, productData.name);
    productData.slug = slug;

    const product = await Product.create(productData);
    await product.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  }),
];

export const updateProduct = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((v) => v >= 0)
    .withMessage('Price cannot be negative'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      return next(new ApiError(404, `Product not found with id: ${id}`));
    }

    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        if (img.public_id && !img.public_id.startsWith('manual-')) {
          await deleteFromCloudinary(img.public_id).catch(() => {});
        }
      }
      const uploadedImages = await uploadMultipleToCloudinary(req.files, 'sskk/products');
      updateData.images = uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    if (updateData.name) {
      updateData.slug = await generateUniqueSlug(Product, updateData.name, id);
    }

    product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  }),
];

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(404, `Product not found with id: ${id}`));
  }

  for (const img of product.images) {
    if (img.public_id && !img.public_id.startsWith('manual-')) {
      await deleteFromCloudinary(img.public_id).catch(() => {});
    }
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export default {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
