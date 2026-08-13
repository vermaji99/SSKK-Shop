import jwt from 'jsonwebtoken';
import { asyncHandler, ApiError } from '../utils/helpers.js';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.sskk_token) {
    token = req.cookies.sskk_token;
  }

  if (!token) {
    return next(
      new ApiError(401, 'Not authorized to access this route. Please log in.')
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_change_in_production'
    );

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ApiError(404, 'User not found with this token'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ApiError(401, 'Not authorized. Token is invalid or expired.')
    );
  }
});

export default protect;
