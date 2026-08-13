import express from 'express';
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, adminOnly, getAllInquiries)
  .post(createInquiry);

router
  .route('/:id')
  .get(protect, adminOnly, getInquiryById)
  .put(protect, adminOnly, updateInquiryStatus)
  .delete(protect, adminOnly, deleteInquiry);

export default router;
