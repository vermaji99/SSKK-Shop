import { asyncHandler, ApiError } from '../utils/helpers.js';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

export const getWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: 'products.product',
    select: 'name slug price discountPrice images featured category',
    populate: {
      path: 'category',
      select: 'name slug',
    },
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [],
    });
  }

  const products = wishlist.products.map((p) => p.product);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

export const addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next(new ApiError(400, 'Product ID is required'));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError(404, `Product not found with id: ${productId}`));
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [],
    });
  }

  const existingIndex = wishlist.products.findIndex(
    (p) => p.product.toString() === productId.toString()
  );

  if (existingIndex !== -1) {
    return next(new ApiError(400, 'Product already in wishlist'));
  }

  wishlist.products.push({ product: productId });
  await wishlist.save();

  await wishlist.populate({
    path: 'products.product',
    select: 'name slug price discountPrice images featured category',
    populate: {
      path: 'category',
      select: 'name slug',
    },
  });

  const products = wishlist.products.map((p) => p.product);

  res.status(200).json({
    success: true,
    message: 'Product added to wishlist',
    count: products.length,
    data: products,
  });
});

export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    return next(new ApiError(404, 'Wishlist not found'));
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(
    (p) => p.product.toString() !== productId.toString()
  );

  if (wishlist.products.length === initialLength) {
    return next(new ApiError(404, 'Product not found in wishlist'));
  }

  await wishlist.save();
  await wishlist.populate({
    path: 'products.product',
    select: 'name slug price discountPrice images featured category',
    populate: {
      path: 'category',
      select: 'name slug',
    },
  });

  const products = wishlist.products.map((p) => p.product);

  res.status(200).json({
    success: true,
    message: 'Product removed from wishlist',
    count: products.length,
    data: products,
  });
});

export const clearWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (wishlist) {
    wishlist.products = [];
    await wishlist.save();
  }

  res.status(200).json({
    success: true,
    message: 'Wishlist cleared',
    data: [],
  });
});

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
