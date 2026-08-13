export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    public_id?: string;
  };
  featured?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ProductImage {
  url: string;
  public_id?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string | Category;
  price: number;
  discountPrice?: number;
  images: ProductImage[];
  featured?: boolean;
  bestseller?: boolean;
  stock?: number;
  goldPurity?: string;
  weight?: number;
  material?: string;
  gemstones?: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isAvailable?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface OrderItem {
  product: string | Product;
  qty: number;
  price: number;
  name: string;
  image: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'upi' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WishlistItem {
  product: Product | string;
  addedAt: string | Date;
}

export interface Wishlist {
  _id: string;
  user: string | User;
  products: WishlistItem[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  pages?: number;
  currentPage?: number;
}
