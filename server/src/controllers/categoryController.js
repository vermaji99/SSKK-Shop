import { asyncHandler, ApiError, generateUniqueSlug } from '../utils/helpers.js';
import Category from '../models/Category.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { body, validationResult } from 'express-validator';

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const { featured } = req.query;
  const query = {};

  if (featured === 'true') {
    query.featured = true;
  }

  const categories = await Category.find(query).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const category = await Category.findOne({ slug });
  if (!category) {
    return next(new ApiError(404, `Category not found with slug: ${slug}`));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

export const createCategory = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { name, description, featured } = req.body;

    let image = {};
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer, 'sskk/categories');
      image = { url: uploaded.url, public_id: uploaded.public_id };
    } else if (req.body.imageUrl) {
      image = {
        url: req.body.imageUrl,
        public_id: `manual-${Date.now()}-${Math.random()}`,
      };
    }

    const slug = await generateUniqueSlug(Category, name);

    const category = await Category.create({
      name,
      slug,
      description,
      featured: featured === 'true' || featured === true,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  }),
];

export const updateCategory = [
  body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { id } = req.params;

    let category = await Category.findById(id);
    if (!category) {
      return next(new ApiError(404, `Category not found with id: ${id}`));
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (category.image?.public_id && !category.image.public_id.startsWith('manual-')) {
        await deleteFromCloudinary(category.image.public_id).catch(() => {});
      }
      const uploaded = await uploadToCloudinary(req.file.buffer, 'sskk/categories');
      updateData.image = { url: uploaded.url, public_id: uploaded.public_id };
    }

    if (updateData.name) {
      updateData.slug = await generateUniqueSlug(Category, updateData.name, id);
    }

    category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  }),
];

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(404, `Category not found with id: ${id}`));
  }

  if (category.image?.public_id && !category.image.public_id.startsWith('manual-')) {
    await deleteFromCloudinary(category.image.public_id).catch(() => {});
  }

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});

export default {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
