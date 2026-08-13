import express from 'express';
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post(protect, adminOnly, upload.single('image'), createCategory);

router.route('/slug/:slug').get(getCategoryBySlug);

router
  .route('/:id')
  .put(protect, adminOnly, upload.single('image'), updateCategory)
  .delete(protect, adminOnly, deleteCategory);

export default router;
