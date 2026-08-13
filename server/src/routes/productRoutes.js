import express from 'express';
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(
  protect,
  adminOnly,
  upload.array('images', 10),
  createProduct
);

router.route('/slug/:slug').get(getProductBySlug);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, adminOnly, upload.array('images', 10), updateProduct)
  .delete(protect, adminOnly, deleteProduct);

export default router;
