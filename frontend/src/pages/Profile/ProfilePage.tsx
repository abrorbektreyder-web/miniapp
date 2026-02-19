import { useUser } from '@store/userStore';
import { useTelegram } from '@hooks/useTelegram';
import Layout from '@components/Layout';
import BottomNav from '@components/BottomNav';
import { getInitials } from '@utils/format';

export default function ProfilePage() {
  const { telegramUser } = useUser();
  const { platform } = useTelegram();

  const userInitials = telegramUser
    ? getInitials(telegramUser.first_name, telegramUser.last_name)
    : '?';

  return (
    <Layout className="pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-tg-bg z-40 safe-top border-b border-tg-section-separator">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-tg-text">Profil</h1>
        </div>
      </header>

      {/* Profile Info */}
      <main className="p-4">
        {/* User Card */}
        <div className="bg-tg-secondary-bg rounded-xl p-4 mb-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-tg-button text-tg-button-text flex items-center justify-center text-xl font-bold">
              {userInitials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-bold text-tg-text text-lg">
                {telegramUser?.first_name || 'Foydalanuvchi'}
                {telegramUser?.last_name && ` ${telegramUser.last_name}`}
              </h2>
              {telegramUser?.username && (
                <p className="text-tg-hint text-sm">@{telegramUser.username}</p>
              )}
              <p className="text-tg-hint text-xs mt-1">
                Platform: {platform || 'Noma\'lum'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-tg-secondary-bg rounded-xl overflow-hidden">
          {/* My Orders */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-tg-bg transition-colors border-b border-tg-section-separator">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-tg-text font-medium">Buyurtmalarim</span>
            </div>
            <svg className="w-5 h-5 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Favorites */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-tg-bg transition-colors border-b border-tg-section-separator">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-tg-text font-medium">Sevimlilar</span>
            </div>
            <svg className="w-5 h-5 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Settings */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-tg-bg transition-colors">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-tg-text font-medium">Sozlamalar</span>
            </div>
            <svg className="w-5 h-5 text-tg-hint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center">
          <p className="text-tg-hint text-sm">Telegram Mini App v0.0.1</p>
        </div>
      </main>

      <BottomNav />
    </Layout>
  );
}
