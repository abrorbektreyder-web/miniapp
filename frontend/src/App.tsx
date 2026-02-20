import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { useUserStore } from './store/userStore';

// ⚡ Lazy-loaded Pages — faqat kerakli sahifa yuklanadi
const HomePage = lazy(() => import('./pages/Home'));
const CartPage = lazy(() => import('./pages/Cart'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));

// ⚡ Admin Pages — oddiy foydalanuvchilar uchun umuman yuklanmaydi
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminComments = lazy(() => import('./pages/admin/AdminComments'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));

// Minimal inline loading spinner for Suspense
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tg-bg">
      <div className="w-8 h-8 border-3 border-tg-button border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// API base URL for prefetch / wake-up ping
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const { user, isReady } = useTelegram();
  const { setTelegramUser } = useUserStore();

  // ⚡ Backend wake-up: Render free-tier cold start oldini olish
  useEffect(() => {
    // Send a lightweight ping to wake backend ASAP
    fetch(`${API_URL}/categories`, {
      method: 'GET',
      priority: 'high' as any,
    }).catch(() => {
      // Silently ignore — this is just a wake-up call
    });
  }, []);

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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AdminProductForm />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/comments" element={<AdminComments />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
