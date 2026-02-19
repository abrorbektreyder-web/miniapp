import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useTelegram } from '@hooks/useTelegram';
import { useUserStore } from '@store/userStore';

// Pages (placeholder for now)
function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-tg-text">Kiyim Do'koni</h1>
        <p className="text-tg-hint">Mini App tez orada ishga tushadi...</p>
      </div>
    </div>
  );
}

function App() {
  const { user, setTelegramUser } = useTelegram();
  const { setTelegramUser: setAppTelegramUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setTelegramUser(user);
      setAppTelegramUser(user);
    }
  }, [user, setTelegramUser, setAppTelegramUser]);

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Other routes will be added in TASK-003 */}
      </Routes>
    </div>
  );
}

export default App;
