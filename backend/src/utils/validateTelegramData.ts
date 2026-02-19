import crypto from 'crypto';

/**
 * Validate Telegram WebApp initData
 * @param initData - Raw initData string from Telegram WebApp
 * @param botToken - Your Telegram bot token
 * @returns True if initData is valid
 */
export function validateInitData(initData: string, botToken: string): boolean {
  try {
    // Create secret key
    const secretKey = crypto
      .createHmac('sha256', botToken)
      .update('WebAppData')
      .digest();

    // Parse initData
    const data = new URLSearchParams(initData);
    const hash = data.get('hash');

    if (!hash) {
      return false;
    }

    // Remove hash from data
    data.delete('hash');

    // Create data check string (sorted by key)
    const dataCheckString = Array.from(data.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    // Compute hash
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Compare hashes
    return computedHash === hash;
  } catch (error) {
    console.error('Error validating initData:', error);
    return false;
  }
}

/**
 * Parse Telegram initData
 * @param initData - Raw initData string
 * @returns Parsed initData object
 */
export function parseInitData(initData: string): Record<string, string> {
  const data = new URLSearchParams(initData);
  const result: Record<string, string> = {};

  for (const [key, value] of data.entries()) {
    result[key] = value;
  }

  return result;
}

/**
 * Get auth date from initData
 * @param initData - Raw initData string
 * @returns Auth date as Unix timestamp
 */
export function getAuthDate(initData: string): number {
  const data = new URLSearchParams(initData);
  const authDate = data.get('auth_date');
  return authDate ? parseInt(authDate, 10) : 0;
}

/**
 * Check if initData is expired
 * @param initData - Raw initData string
 * @param maxAge - Max age in seconds (default: 24 hours)
 * @returns True if expired
 */
export function isInitDataExpired(initData: string, maxAge: number = 86400): boolean {
  const authDate = getAuthDate(initData);
  const now = Math.floor(Date.now() / 1000);
  return now - authDate > maxAge;
}
