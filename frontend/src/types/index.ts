// Product types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: Category;
  images: ProductImage[];
  sizes: ProductSize[];
  colors: ProductColor[];
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  order: number;
}

export interface ProductSize {
  id: number;
  size: string;
}

export interface ProductColor {
  id: number;
  name: string;
  hexCode: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

// Cart types
export interface CartItem {
  product: Product;
  size?: string;
  color?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

// Order types
export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  size: string | null;
  color: string | null;
  quantity: number;
  price: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// User types
export interface User {
  id: number;
  telegramId: number;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// Comment types
export interface Comment {
  id: number;
  text: string;
  rating: number;
  user: User;
  product: Product;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Query params
export interface ProductsQuery {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export interface CommentsQuery {
  sortBy?: 'newest' | 'oldest' | 'rating_high' | 'rating_low';
  page?: number;
  limit?: number;
}
