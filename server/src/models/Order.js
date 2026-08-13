import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price cannot be negative'],
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      name: {
        type: String,
        required: [true, 'Shipping name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Shipping phone is required'],
        trim: true,
      },
      address: {
        type: String,
        required: [true, 'Shipping address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['cod', 'upi', 'card', 'bank_transfer'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
