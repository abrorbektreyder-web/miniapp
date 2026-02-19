import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminClient';
import AdminLayout from '../../components/admin/AdminLayout';
import { formatPrice } from '../../utils/format';

export default function AdminProducts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search
  useState(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  });

  // Fetch products
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-products', page, debouncedSearch],
    queryFn: async () => {
      const response = await adminApi.products.getAll({ 
        page, 
        search: debouncedSearch, 
        limit: 20 
      });
      return response.data.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.products.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm('Mahsulotni o\'chirishni xohlaysizmi?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDebouncedSearch(e.target.value);
  };

  const products = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <AdminLayout title="Mahsulotlar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mahsulotlar</h1>
          <p className="text-gray-500 mt-1">Barcha mahsulotlarni boshqaring</p>
        </div>
        <button
          onClick={() => navigate('/admin/products/add')}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yangi mahsulot
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Mahsulot qidirish..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rasm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nomi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kategoriya
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Narx
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-400">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Yuklanmoqda...
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <p>Mahsulotlar topilmadi</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        {product.rating > 0 && (
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="text-yellow-500">★</span>{' '}
                            {product.rating.toFixed(1)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{product.category?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          product.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.isActive ? 'Aktiv' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteMutation.isPending}
                          className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                        >
                          O'chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors font-medium"
          >
            ← Oldingi
          </button>
          <span className="px-4 py-2 text-gray-600 font-medium">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors font-medium"
          >
            Keyingi →
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
