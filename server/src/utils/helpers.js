import jwt from 'jsonwebtoken';

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'default_secret_change_in_production',
    {
      expiresIn: '30d',
    }
  );
};

export const generateUniqueSlug = async (Model, name, suffix = '') => {
  const baseSlug = slugify(name) + (suffix ? `-${suffix}` : '');
  const existing = await Model.findOne({ slug: baseSlug });
  if (existing) {
    const newSuffix = suffix ? parseInt(suffix) + 1 : 1;
    return generateUniqueSlug(Model, name, newSuffix.toString());
  }
  return baseSlug;
};
