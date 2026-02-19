import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi } from '../../api/adminClient';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await adminApi.dashboard.getStats();
      return response.data.data;
    },
  });

  const stats = [
    {
      title: 'Mahsulotlar',
      value: data?.overview?.totalProducts || 0,
      icon: '📦',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Buyurtmalar',
      value: data?.overview?.totalOrders || 0,
      icon: '🛒',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Daromad',
      value: `${(data?.overview?.totalRevenue || 0).toLocaleString()} so'm`,
      icon: '💰',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Foydalanuvchilar',
      value: data?.overview?.totalUsers || 0,
      icon: '👥',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Oxirgi buyurtmalar</h2>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Barchasi →
            </button>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Yuklanmoqda...</div>
          ) : data?.recentOrders?.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Buyurtmalar yo'q</div>
          ) : (
            <div className="space-y-3">
              {data?.recentOrders?.slice(0, 5).map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-800">#{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {order.totalAmount.toLocaleString()} so'm
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status === 'PENDING' ? 'Kutilmoqda' : order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Top mahsulotlar</h2>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Barchasi →
            </button>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Yuklanmoqda...</div>
          ) : data?.topProducts?.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Mahsulotlar yo'q</div>
          ) : (
            <div className="space-y-3">
              {data?.topProducts?.slice(0, 5).map((item: any, index: number) => (
                <div
                  key={item.product?.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    #{index + 1}
                  </div>
                  <img
                    src={item.product?.images?.[0]?.url || '/placeholder.jpg'}
                    alt={item.product?.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {item.product?.name || 'Noma\'lum'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.totalQuantity || 0} ta sotilgan
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Tezkor harakatlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/products/add')}
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Mahsulot qo'shish</p>
              <p className="text-sm text-gray-500">Yangi tovar</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Buyurtmalar</p>
              <p className="text-sm text-gray-500">Boshqarish</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/comments')}
            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Izohlar</p>
              <p className="text-sm text-gray-500">Moderatsiya</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/categories')}
            className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Kategoriyalar</p>
              <p className="text-sm text-gray-500">Guruhlar</p>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
