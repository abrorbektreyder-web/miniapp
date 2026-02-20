import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi } from '../../api/adminClient';

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Kutilmoqda', color: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'Tasdiqlangan', color: 'bg-blue-100 text-blue-800' },
  SHIPPED: { label: 'Yetkazilmoqda', color: 'bg-purple-100 text-purple-800' },
  DELIVERED: { label: 'Yetkazildi', color: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'Bekor qilingan', color: 'bg-red-100 text-red-800' },
};

const ALL_STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Fetch orders
  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', page, filterStatus],
    queryFn: async () => {
      const response = await adminApi.orders.getAll({
        page,
        limit: 20,
        status: filterStatus || undefined,
      });
      return response.data.data;
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminApi.orders.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.orders.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await updateStatusMutation.mutateAsync({ id: orderId, status: newStatus });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Buyurtmani o'chirishni xohlaysizmi?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const orders = data?.items || data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <AdminLayout title="Buyurtmalar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buyurtmalar</h1>
          <p className="text-gray-500 mt-1">Barcha buyurtmalarni boshqaring</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setFilterStatus(''); setPage(1); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            !filterStatus
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Barchasi
        </button>
        {ALL_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => { setFilterStatus(status); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterStatus === status
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {STATUS_MAP[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Yuklanmoqda...
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400 text-lg">Buyurtmalar topilmadi</p>
          </div>
        ) : (
          orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold">#{order.id}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.user?.firstName || order.user?.username || `Foydalanuvchi #${order.userId}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">
                      {(order.totalAmount || 0).toLocaleString()} so'm
                    </p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${STATUS_MAP[order.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {STATUS_MAP[order.status]?.label || order.status}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-3">Mahsulotlar:</h4>
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                              {item.product?.images?.[0]?.url && (
                                <img
                                  src={item.product.images[0].url}
                                  alt={item.product?.name}
                                  className="w-10 h-10 object-cover rounded-lg"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-800">{item.product?.name || 'Mahsulot'}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x {(item.price || 0).toLocaleString()} so'm
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-800">
                              {((item.quantity || 0) * (item.price || 0)).toLocaleString()} so'm
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comment */}
                  {order.comment && (
                    <div className="mb-4 p-3 bg-white rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Izoh:</p>
                      <p className="text-gray-700">{order.comment}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-sm font-medium text-gray-600">Holatni o'zgartirish:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={updateStatusMutation.isPending}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    >
                      {ALL_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_MAP[status]?.label || status}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={deleteMutation.isPending}
                      className="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
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
