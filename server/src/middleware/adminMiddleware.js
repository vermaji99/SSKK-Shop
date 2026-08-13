import { asyncHandler, ApiError } from '../utils/helpers.js';

export const adminOnly = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Not authorized. Please log in.'));
  }

  if (req.user.role !== 'admin') {
    return next(
      new ApiError(403, 'Access denied. Admin privileges required.')
    );
  }

  next();
});

export default adminOnly;
