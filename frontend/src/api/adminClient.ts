import apiClient from './client';
import type { Product, Category } from '../types/index';

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  sizes?: string[];
  colors?: { name: string; hexCode: string }[];
  images?: { url: string; order?: number }[];
  isActive?: boolean;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export const adminApi = {
  // Products
  products: {
    getAll: (params?: {
      category?: string;
      search?: string;
      isActive?: boolean;
      sortBy?: string;
      page?: number;
      limit?: number;
    }) =>
      apiClient.get('/admin/products', { params }),

    getById: (id: number) =>
      apiClient.get(`/admin/products/${id}`),

    create: (data: CreateProductData) =>
      apiClient.post('/admin/products', data),

    update: (id: number, data: UpdateProductData) =>
      apiClient.put(`/admin/products/${id}`, data),

    delete: (id: number) =>
      apiClient.delete(`/admin/products/${id}`),
  },

  // Categories
  categories: {
    getAll: () =>
      apiClient.get('/admin/categories'),

    create: (data: { name: string; description?: string }) =>
      apiClient.post('/admin/categories', data),

    update: (id: number, data: { name: string; description?: string }) =>
      apiClient.put(`/admin/categories/${id}`, data),

    delete: (id: number) =>
      apiClient.delete(`/admin/categories/${id}`),
  },

  // Upload
  upload: {
    images: (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));
      return apiClient.post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    delete: (filename: string) =>
      apiClient.delete(`/admin/upload/${filename}`),
  },

  // Dashboard
  dashboard: {
    getStats: () =>
      apiClient.get('/admin/dashboard'),
  },

  // Orders
  orders: {
    getAll: (params?: { status?: string; sortBy?: string; page?: number; limit?: number }) =>
      apiClient.get('/admin/orders', { params }),

    getById: (id: number) =>
      apiClient.get(`/admin/orders/${id}`),

    updateStatus: (id: number, status: string) =>
      apiClient.put(`/admin/orders/${id}`, { status }),

    delete: (id: number) =>
      apiClient.delete(`/admin/orders/${id}`),
  },

  // Comments
  comments: {
    getAll: (params?: { isVisible?: boolean; sortBy?: string; page?: number; limit?: number }) =>
      apiClient.get('/admin/comments', { params }),

    update: (id: number, data: { isVisible?: boolean }) =>
      apiClient.put(`/admin/comments/${id}`, data),

    delete: (id: number) =>
      apiClient.delete(`/admin/comments/${id}`),
  },
};
