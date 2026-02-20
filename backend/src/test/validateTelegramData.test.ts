import { describe, it, expect, beforeEach, vi } from 'vitest';
import crypto from 'crypto';
import { validateInitData, parseInitData, getAuthDate, isInitDataExpired } from '../utils/validateTelegramData.js';

describe('validateTelegramData', () => {
  const botToken = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';

  describe('validateInitData', () => {
    it('should return false for empty initData', () => {
      expect(validateInitData('', botToken)).toBe(false);
    });

    it('should return false for invalid hash', () => {
      const initData = 'user=%7B%22id%22%3A123%7D&hash=invalid';
      expect(validateInitData(initData, botToken)).toBe(false);
    });

    it('should return true for valid initData', () => {
      // Create valid initData
      const authDate = Math.floor(Date.now() / 1000);
      const userData = JSON.stringify({ id: 123, first_name: 'Test' });
      const dataCheckString = `auth_date=${authDate}\nuser=${encodeURIComponent(userData)}`;
      
      const secretKey = crypto
        .createHmac('sha256', botToken)
        .update('WebAppData')
        .digest();
      
      const hash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

      const initData = `user=${encodeURIComponent(userData)}&auth_date=${authDate}&hash=${hash}`;
      
      expect(validateInitData(initData, botToken)).toBe(true);
    });
  });

  describe('parseInitData', () => {
    it('should parse initData correctly', () => {
      const initData = 'user=%7B%22id%22%3A123%7D&auth_date=1234567890';
      const parsed = parseInitData(initData);
      
      expect(parsed.user).toBe('{"id":123}');
      expect(parsed.auth_date).toBe('1234567890');
    });

    it('should handle empty initData', () => {
      const parsed = parseInitData('');
      expect(parsed).toEqual({});
    });
  });

  describe('getAuthDate', () => {
    it('should extract auth_date from initData', () => {
      const initData = 'user=test&auth_date=1234567890&hash=abc';
      expect(getAuthDate(initData)).toBe(1234567890);
    });

    it('should return 0 for missing auth_date', () => {
      const initData = 'user=test&hash=abc';
      expect(getAuthDate(initData)).toBe(0);
    });
  });

  describe('isInitDataExpired', () => {
    it('should return false for recent initData', () => {
      const now = Math.floor(Date.now() / 1000);
      const initData = `auth_date=${now}&hash=test`;
      expect(isInitDataExpired(initData)).toBe(false);
    });

    it('should return true for old initData', () => {
      const oldDate = Math.floor(Date.now() / 1000) - 86400 * 2; // 2 days ago
      const initData = `auth_date=${oldDate}&hash=test`;
      expect(isInitDataExpired(initData)).toBe(true);
    });

    it('should use custom maxAge', () => {
      const oldDate = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const initData = `auth_date=${oldDate}&hash=test`;
      expect(isInitDataExpired(initData, 1800)).toBe(true); // 30 min maxAge
    });
  });
});
