import { asyncHandler, ApiError } from '../utils/helpers.js';
import Inquiry from '../models/Inquiry.js';
import { body, validationResult } from 'express-validator';

export const getAllInquiries = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 50 } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [inquiries, total] = await Promise.all([
    Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Inquiry.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: inquiries.length,
    total,
    pages: Math.ceil(total / limitNum) || 1,
    data: inquiries,
  });
});

export const getInquiryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    return next(new ApiError(404, `Inquiry not found with id: ${id}`));
  }

  res.status(200).json({
    success: true,
    data: inquiry,
  });
});

export const createInquiry = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Please enter a valid phone number'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('category').optional().trim(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { name, phone, email, category, message } = req.body;

    const inquiry = await Inquiry.create({
      name,
      phone,
      email,
      category,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you soon!',
      data: inquiry,
    });
  }),
];

export const updateInquiryStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'contacted', 'completed'];
  if (!validStatuses.includes(status)) {
    return next(
      new ApiError(
        400,
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      )
    );
  }

  const inquiry = await Inquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!inquiry) {
    return next(new ApiError(404, `Inquiry not found with id: ${id}`));
  }

  res.status(200).json({
    success: true,
    message: 'Inquiry status updated successfully',
    data: inquiry,
  });
});

export const deleteInquiry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    return next(new ApiError(404, `Inquiry not found with id: ${id}`));
  }

  await Inquiry.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Inquiry deleted successfully',
  });
});

export default {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
};
