import { useEffect, useState, useCallback } from 'react';
import type { TelegramWebApp, WebAppUser, ThemeParams } from '../types/telegram';

interface UseTelegramReturn {
  webApp: TelegramWebApp | null;
  user: WebAppUser | null;
  themeParams: ThemeParams | null;
  colorScheme: 'light' | 'dark';
  platform: string;
  isReady: boolean;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  hapticImpact: (style?: 'light' | 'medium' | 'heavy') => void;
  hapticNotification: (style?: 'error' | 'success' | 'warning') => void;
  hapticSelection: () => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string) => Promise<boolean>;
}

export function useTelegram(): UseTelegramReturn {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [themeParams, setThemeParams] = useState<ThemeParams | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [platform, setPlatform] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Set initial values
      setWebApp(tg);
      setUser(tg.initDataUnsafe?.user || null);
      setThemeParams(tg.themeParams || null);
      setColorScheme(tg.colorScheme || 'light');
      setPlatform(tg.platform || '');

      // Ready signal
      tg.ready();
      setIsReady(true);

      // Expand the app
      tg.expand();

      // Theme change handler
      const handleThemeChange = () => {
        setThemeParams(tg.themeParams || null);
        setColorScheme(tg.colorScheme || 'light');
      };

      tg.onEvent('themeChanged', handleThemeChange);

      // Cleanup
      return () => {
        tg.offEvent('themeChanged', handleThemeChange);
      };
    } else {
      // Not in Telegram, set defaults for development
      setIsReady(true);
    }
  }, []);

  const expand = useCallback(() => {
    webApp?.expand();
  }, [webApp]);

  const close = useCallback(() => {
    webApp?.close();
  }, [webApp]);

  const setHeaderColor = useCallback((color: string) => {
    webApp?.setHeaderColor(color);
  }, [webApp]);

  const setBackgroundColor = useCallback((color: string) => {
    webApp?.setBackgroundColor(color);
  }, [webApp]);

  const enableClosingConfirmation = useCallback(() => {
    webApp?.enableClosingConfirmation();
  }, [webApp]);

  const disableClosingConfirmation = useCallback(() => {
    webApp?.disableClosingConfirmation();
  }, [webApp]);

  const hapticImpact = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
    webApp?.HapticFeedback?.impactOccurred(style);
  }, [webApp]);

  const hapticNotification = useCallback((style: 'error' | 'success' | 'warning' = 'success') => {
    webApp?.HapticFeedback?.notificationOccurred(style);
  }, [webApp]);

  const hapticSelection = useCallback(() => {
    webApp?.HapticFeedback?.selectionChanged();
  }, [webApp]);

  const showAlert = useCallback((message: string) => {
    webApp?.showAlert(message);
  }, [webApp]);

  const showConfirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      webApp?.showConfirm(message, resolve);
    });
  }, [webApp]);

  return {
    webApp,
    user,
    themeParams,
    colorScheme,
    platform,
    isReady,
    expand,
    close,
    setHeaderColor,
    setBackgroundColor,
    enableClosingConfirmation,
    disableClosingConfirmation,
    hapticImpact,
    hapticNotification,
    hapticSelection,
    showAlert,
    showConfirm,
  };
}
