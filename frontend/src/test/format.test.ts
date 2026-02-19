import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, formatRelativeTime, truncateText, generateSlug } from '../utils/format';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(10000)).toBe("10 000,00 so'm");
    expect(formatPrice(1000)).toBe("1 000,00 so'm");
    expect(formatPrice(500)).toBe("500,00 so'm");
  });

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe("0,00 so'm");
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00');
    const formatted = formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
    expect(formatted).toContain('2024');
    expect(formatted).toContain('yanvar');
    expect(formatted).toContain('15');
  });
});

describe('formatRelativeTime', () => {
  it('should return "Hozirgina" for recent dates', () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe('Hozirgina');
  });

  it('should format minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const formatted = formatRelativeTime(fiveMinutesAgo);
    expect(formatted).toContain('daqiqa oldin');
  });

  it('should format hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const formatted = formatRelativeTime(twoHoursAgo);
    expect(formatted).toContain('soat oldin');
  });

  it('should format days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const formatted = formatRelativeTime(threeDaysAgo);
    expect(formatted).toContain('kun oldin');
  });
});

describe('truncateText', () => {
  it('should truncate long text', () => {
    const longText = 'Bu juda uzun matn va uni qisqartirish kerak';
    expect(truncateText(longText, 10)).toBe('Bu juda...');
  });

  it('should not truncate short text', () => {
    const shortText = 'Qisqa matn';
    expect(truncateText(shortText, 20)).toBe('Qisqa matn');
  });

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });
});

describe('generateSlug', () => {
  it('should generate slug from text', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
    expect(generateSlug('O\'zbekiston Respublikasi')).toBe('ozbekiston-respublikasi');
  });

  it('should handle special characters', () => {
    expect(generateSlug('Test!@#$%^&*()')).toBe('test');
  });

  it('should handle multiple spaces', () => {
    expect(generateSlug('Hello    World')).toBe('hello-world');
  });
});
