import { asyncHandler, ApiError } from '../utils/helpers.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { body, validationResult } from 'express-validator';

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 50 } = req.query;
  const query = {};
  if (req.user.role !== 'admin') {
    query.user = req.user._id;
  }
  if (status) {
    query.status = status;
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product', 'name slug images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    pages: Math.ceil(total / limitNum) || 1,
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate('user', 'name email phone')
    .populate('items.product', 'name slug images');

  if (!order) {
    return next(new ApiError(404, `Order not found with id: ${id}`));
  }

  if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
    return next(new ApiError(403, 'Not authorized to view this order'));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const createOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('shippingAddress.name')
    .trim()
    .notEmpty()
    .withMessage('Shipping name is required'),
  body('shippingAddress.phone')
    .trim()
    .notEmpty()
    .withMessage('Shipping phone is required'),
  body('shippingAddress.address')
    .trim()
    .notEmpty()
    .withMessage('Shipping address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.pincode')
    .trim()
    .notEmpty()
    .withMessage('Pincode is required'),
  body('paymentMethod')
    .isIn(['cod', 'upi', 'card', 'bank_transfer'])
    .withMessage('Valid payment method is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ApiError(400, errors.array().map((e) => e.msg).join(', '))
      );
    }

    const { items, shippingAddress, paymentMethod } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return next(
          new ApiError(404, `Product not found with id: ${item.product}`)
        );
      }
      if (product.stock < item.qty) {
        return next(
          new ApiError(400, `Insufficient stock for product: ${product.name}`)
        );
      }

      const price = product.discountPrice || product.price;
      const itemTotal = price * item.qty;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        qty: item.qty,
        price,
        name: product.name,
        image: product.images[0]?.url || '',
      });

      product.stock -= item.qty;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.populate('user', 'name email phone');
    await order.populate('items.product', 'name slug images');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  }),
];

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return next(new ApiError(404, `Order not found with id: ${id}`));
  }

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const validPaymentStatuses = ['pending', 'completed', 'failed', 'refunded'];

  if (status && !validStatuses.includes(status)) {
    return next(new ApiError(400, `Invalid order status: ${status}`));
  }
  if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
    return next(new ApiError(400, `Invalid payment status: ${paymentStatus}`));
  }

  if (status === 'cancelled' && order.status !== 'cancelled') {
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.qty;
        await product.save();
      }
    }
  }

  order.status = status || order.status;
  order.paymentStatus = paymentStatus || order.paymentStatus;
  await order.save();

  await order.populate('user', 'name email phone');
  await order.populate('items.product', 'name slug images');

  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    data: order,
  });
});

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
