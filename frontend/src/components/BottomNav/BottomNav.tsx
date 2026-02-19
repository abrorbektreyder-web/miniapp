import { NavLink } from 'react-router-dom';
import { useCart } from '../../store/cartStore';

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-tg-bottom-bar-bg border-t border-tg-section-separator safe-bottom z-50">
      <div className="flex items-center justify-around py-2">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
              isActive
                ? 'text-tg-button'
                : 'text-tg-hint hover:text-tg-text'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Bosh sahifa</span>
        </NavLink>

        {/* Cart */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
              isActive
                ? 'text-tg-button'
                : 'text-tg-hint hover:text-tg-text'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs font-medium">Savat</span>
          {itemCount > 0 && (
            <span className="absolute -top-1 right-2 bg-tg-button text-tg-button-text text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {itemCount}
            </span>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
              isActive
                ? 'text-tg-button'
                : 'text-tg-hint hover:text-tg-text'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-medium">Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}
