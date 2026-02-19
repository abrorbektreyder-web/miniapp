export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface WebAppChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
}

export interface WebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

export interface ThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
  header_bg_color: string;
  bottom_bar_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  section_separator_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: ThemeParams;
  isActive: boolean;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  safeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  contentSafeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  // Methods
  ready(): void;
  expand(): void;
  close(): void;
  minimize(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  setBottomBarColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  isVersionAtLeast(version: string): boolean;
  onEvent(eventType: string, handler: () => void): void;
  offEvent(eventType: string, handler: () => void): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(params: PopupParams, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(params: { text?: string }, callback?: (data: string) => boolean): void;
  closeScanQrPopup(): void;
  requestWriteAccess(callback?: (allowed: boolean) => void): void;
  requestContact(callback?: (allowed: boolean) => void): void;
  readTextFromClipboard(callback?: (text: string) => void): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  requestFullscreen(): void;
  exitFullscreen(): void;
  lockOrientation(): void;
  unlockOrientation(): void;
  addToHomeScreen(): void;
  checkHomeScreenStatus(callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void): void;
  setEmojiStatus(emojiId: string, params?: { duration?: number }, callback?: () => void): void;
  requestEmojiStatusAccess(callback?: (allowed: boolean) => void): void;
  shareToStory(mediaUrl: string, params?: { text?: string; widget_link?: { url: string; name: string } }): void;
  shareMessage(messageId: number, callback?: () => void): void;
  downloadFile(params: { url: string; file_name: string }, callback?: () => void): void;

  // MainButton
  MainButton: MainButton;
  // SecondaryButton
  SecondaryButton: SecondaryButton;
  // BackButton
  BackButton: BackButton;
  // HapticFeedback
  HapticFeedback: HapticFeedback;
  // CloudStorage
  CloudStorage: CloudStorage;
  // BiometricManager
  BiometricManager: BiometricManager;
  // LocationManager
  LocationManager: LocationManager;
  // Accelerometer
  Accelerometer: Accelerometer;
  // Gyroscope
  Gyroscope: Gyroscope;
  // DeviceOrientation
  DeviceOrientation: DeviceOrientation;
}

export interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  hasShineEffect: boolean;
  isProgressVisible: boolean;

  show(): void;
  hide(): void;
  enable(): void;
  disable(): void;
  showProgress(leaveActive?: boolean): void;
  hideProgress(): void;
  setText(text: string): void;
  setParams(params: MainButtonParams): void;
  onClick(handler: () => void): void;
  offClick(handler: () => void): void;
}

export interface SecondaryButton {
  text: string;
  type: string;
  position: 'left' | 'right' | 'top' | 'bottom';

  show(): void;
  hide(): void;
  enable(): void;
  disable(): void;
  setText(text: string): void;
  setParams(params: SecondaryButtonParams): void;
  onClick(handler: () => void): void;
  offClick(handler: () => void): void;
}

export interface BackButton {
  isVisible: boolean;

  show(): void;
  hide(): void;
  onClick(handler: () => void): void;
  offClick(handler: () => void): void;
}

export interface MainButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
}

export interface SecondaryButtonParams {
  text?: string;
  type?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

export interface PopupButton {
  id?: string;
  type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
}

export interface HapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
  notificationOccurred(style: 'error' | 'success' | 'warning'): void;
  selectionChanged(): void;
}

export interface CloudStorage {
  setItem(key: string, value: string, callback?: (error: Error | null) => void): void;
  getItem(key: string, callback?: (error: Error | null, value?: string) => void): void;
  getItems(keys: string[], callback?: (error: Error | null, values: { [key: string]: string | null } | null) => void): void;
  removeItem(key: string, callback?: (error: Error | null) => void): void;
  removeItems(keys: string[], callback?: (error: Error | null) => void): void;
  getKeys(callback?: (error: Error | null, keys: string[] | null) => void): void;
}

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  isBiometricEnabled: boolean;
  isFaceIdEnabled: boolean;
  isTouchIdEnabled: boolean;
  isPasscodeEnabled: boolean;

  init(callback?: () => void): void;
  requestAccess(params: { reason?: string }, callback?: (success: boolean) => void): void;
  authenticate(params: { reason?: string }, callback?: (success: boolean) => void): void;
}

export interface LocationManager {
  init(callback?: () => void): void;
  getLocation(callback?: (data: { latitude: number; longitude: number; accuracy: number } | null) => void): void;
}

export interface Accelerometer {
  start(params: { refresh_rate: number }): void;
  stop(): void;
}

export interface Gyroscope {
  start(params: { refresh_rate: number }): void;
  stop(): void;
}

export interface DeviceOrientation {
  start(params: { refresh_rate: number; need_absolute: boolean }): void;
  stop(): void;
}

// Global Telegram object
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
