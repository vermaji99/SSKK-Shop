import { asyncHandler, ApiError, generateToken } from '../utils/helpers.js';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

export const register = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Please enter a valid phone number'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists with this email'));
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role === 'admin' && req.user?.role === 'admin' ? 'admin' : 'customer',
    });

    user.password = undefined;

    const token = generateToken(user._id);

    res.cookie('sskk_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token,
      },
    });
  }),
];

export const login = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    user.password = undefined;

    const token = generateToken(user._id);

    res.cookie('sskk_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user,
        token,
      },
    });
  }),
];

export const getMe = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Not authorized. Please log in.'));
  }

  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('sskk_token');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

export default {
  register,
  login,
  getMe,
  logout,
};
