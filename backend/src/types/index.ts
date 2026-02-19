import { User, Product, Order, Comment, Category } from '@prisma/client';

// Extended types with relations
export interface UserWithRelations extends User {
  comments: Comment[];
  orders: Order[];
}

export interface ProductWithRelations extends Product {
  category: Category;
  images: ProductImage[];
  sizes: ProductSize[];
  colors: ProductColor[];
  comments: Comment[];
}

export interface ProductImage {
  id: number;
  url: string;
  productId: number;
  order: number;
}

export interface ProductSize {
  id: number;
  size: string;
  productId: number;
}

export interface ProductColor {
  id: number;
  name: string;
  hexCode: string;
  productId: number;
}

export interface OrderWithRelations extends Order {
  user: User;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  size: string | null;
  color: string | null;
  quantity: number;
  price: number;
  product?: Product;
}

export interface CommentWithRelations extends Comment {
  user: User;
  product: Product;
}

// Request types
export interface AuthRequest {
  user?: {
    id: number;
    telegramId: number;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    photoUrl: string | null;
  };
}

export interface AdminAuthRequest {
  admin?: {
    id: number;
    username: string;
  };
}

// Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query types
export interface ProductsQuery {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export interface OrdersQuery {
  status?: string;
  userId?: number;
  sortBy?: 'newest' | 'oldest' | 'total_high' | 'total_low';
  page?: number;
  limit?: number;
}

export interface CommentsQuery {
  productId?: number;
  sortBy?: 'newest' | 'oldest' | 'rating_high' | 'rating_low';
  page?: number;
  limit?: number;
}

// JWT payload
export interface JWTPayload {
  userId: number;
  telegramId: number;
  iat?: number;
  exp?: number;
}

export interface AdminJWTPayload {
  adminId: number;
  username: string;
  iat?: number;
  exp?: number;
}
