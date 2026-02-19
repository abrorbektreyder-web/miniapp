import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { useUserStore } from './store/userStore';

// Pages
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import ProfilePage from './pages/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const { user, isReady } = useTelegram();
  const { setTelegramUser } = useUserStore();

  useEffect(() => {
    if (user && isReady) {
      setTelegramUser(user);
    }
  }, [user, isReady, setTelegramUser]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tg-bg">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-tg-button border-t-tg-button/30 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-tg-hint">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text">
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
