import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth (will be implemented with real API)
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tg-bg">
        <div className="w-10 h-10 border-4 border-tg-button border-t-tg-button/30 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tg-bg">
      {/* Header */}
      <header className="sticky top-0 bg-tg-secondary-bg z-40 border-b border-tg-section-separator">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-tg-text">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token');
              navigate('/admin/login');
            }}
            className="text-tg-hint hover:text-tg-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-tg-hint text-sm">Mahsulotlar</span>
            </div>
            <p className="text-2xl font-bold text-tg-text">0</p>
          </div>

          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-tg-hint text-sm">Buyurtmalar</span>
            </div>
            <p className="text-2xl font-bold text-tg-text">0</p>
          </div>

          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-tg-hint text-sm">Daromad</span>
            </div>
            <p className="text-2xl font-bold text-tg-text">0 so'm</p>
          </div>

          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-tg-hint text-sm">Foydalanuvchilar</span>
            </div>
            <p className="text-2xl font-bold text-tg-text">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-tg-secondary-bg rounded-xl p-4">
          <h2 className="text-lg font-bold text-tg-text mb-4">Tezkor harakatlar</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/admin/products')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-tg-bg transition-colors"
            >
              <div className="w-10 h-10 bg-tg-button/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-tg-text font-medium flex-1 text-left">Mahsulot qo'shish</span>
              <svg className="w-5 h-5 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-tg-bg transition-colors"
            >
              <div className="w-10 h-10 bg-tg-button/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-tg-text font-medium flex-1 text-left">Buyurtmalar</span>
              <svg className="w-5 h-5 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
