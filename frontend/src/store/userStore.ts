import { create } from 'zustand';
import type { WebAppUser } from '../types/telegram';
import type { User } from '../types/index';

interface UserStore {
  telegramUser: WebAppUser | null;
  appUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTelegramUser: (user: WebAppUser | null) => void;
  setAppUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  telegramUser: null,
  appUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setTelegramUser: (user) => set({ telegramUser: user }),
  setAppUser: (user) => set({ appUser: user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  logout: () => set({ appUser: null, isAuthenticated: false, error: null }),
}));

// Export hook for easier usage
export function useUser() {
  const {
    telegramUser,
    appUser,
    isAuthenticated,
    isLoading,
    error,
    setTelegramUser,
    setAppUser,
    setLoading,
    setError,
    logout,
  } = useUserStore();

  return {
    telegramUser,
    appUser,
    isAuthenticated,
    isLoading,
    error,
    setTelegramUser,
    setAppUser,
    setLoading,
    setError,
    logout,
  };
}
