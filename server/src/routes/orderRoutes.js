import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAllOrders).post(protect, createOrder);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/status').put(protect, adminOnly, updateOrderStatus);

export default router;
