import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError, PaginatedResponse } from '../types/index';

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add Telegram initData
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get Telegram initData
    const initData = window.Telegram?.WebApp?.initData;
    
    if (initData) {
      config.headers['X-Telegram-Init-Data'] = initData;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear user data
          window.localStorage.removeItem('auth-token');
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('API Error:', data?.error?.message || 'Unknown error');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
    } else {
      // Error setting up request
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// API functions
export const api = {
  // Products
  products: {
    getAll: (params?: {
      category?: string;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      sortBy?: string;
      page?: number;
      limit?: number;
    }) =>
      apiClient.get<ApiResponse<PaginatedResponse<any>>>('/products', { params }),
    
    getBySlug: (slug: string) =>
      apiClient.get<ApiResponse<any>>(`/products/${slug}`),
    
    getComments: (productId: number, params?: { sortBy?: string; page?: number; limit?: number }) =>
      apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/products/${productId}/comments`, { params }),
  },

  // Categories
  categories: {
    getAll: () =>
      apiClient.get<ApiResponse<any[]>>('/categories'),
  },

  // Orders
  orders: {
    create: (data: { items: any[]; comment?: string }) =>
      apiClient.post<ApiResponse<any>>('/orders', data),
    
    getAll: () =>
      apiClient.get<ApiResponse<any[]>>('/orders'),
    
    getById: (id: number) =>
      apiClient.get<ApiResponse<any>>(`/orders/${id}`),
  },

  // Comments
  comments: {
    create: (data: { productId: number; text: string; rating: number }) =>
      apiClient.post<ApiResponse<any>>('/comments', data),
    
    update: (id: number, data: { text?: string; rating?: number }) =>
      apiClient.put<ApiResponse<any>>(`/comments/${id}`, data),
    
    delete: (id: number) =>
      apiClient.delete<ApiResponse<void>>(`/comments/${id}`),
  },

  // User
  user: {
    getProfile: () =>
      apiClient.get<ApiResponse<any>>('/me'),
  },
};
