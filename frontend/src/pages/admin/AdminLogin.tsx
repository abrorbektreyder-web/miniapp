import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // API call will be added later
      // For now, just simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store token (will be implemented with real API)
      localStorage.setItem('admin_token', 'dummy_token');
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login yoki parol noto\'g\'ri');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tg-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-tg-button rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-tg-button-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-tg-text">Admin Panel</h1>
          <p className="text-tg-hint mt-2">Tizimga kirish</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-tg-secondary-bg rounded-2xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-tg-text text-sm font-medium mb-2">
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-tg-bg text-tg-text rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tg-button"
              placeholder="admin"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-tg-text text-sm font-medium mb-2">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-tg-bg text-tg-text rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tg-button"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-tg-button text-tg-button-text font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kirish...' : 'Kirish'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-tg-secondary-bg rounded-xl">
          <p className="text-tg-hint text-sm text-center">
            Demo credentials:
            <br />
            <span className="text-tg-text font-medium">admin</span> /{' '}
            <span className="text-tg-text font-medium">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
