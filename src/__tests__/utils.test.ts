import { describe, it, expect } from 'vitest';
import { cn, toArabicDigits } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('toArabicDigits', () => {
    it('converts ASCII digits 0-9 to Eastern Arabic numerals', () => {
      expect(toArabicDigits('0123456789')).toBe('٠١٢٣٤٥٦٧٨٩');
    });

    it('converts numerical inputs directly', () => {
      expect(toArabicDigits(2025)).toBe('٢٠٢٥');
      expect(toArabicDigits(11)).toBe('١١');
      expect(toArabicDigits(0)).toBe('٠');
    });

    it('handles mixed strings with prefixes, suffixes, and symbols', () => {
      expect(toArabicDigits('+11 projects')).toBe('+١١ projects');
      expect(toArabicDigits('100%')).toBe('١٠٠%');
      expect(toArabicDigits('سنة 2024')).toBe('سنة ٢٠٢٤');
    });

    it('returns non-digit strings unmodified', () => {
      expect(toArabicDigits('Hello World')).toBe('Hello World');
      expect(toArabicDigits('مرحبا')).toBe('مرحبا');
    });
  });

  describe('cn (Classnames and Tailwind Merge)', () => {
    it('merges single and multiple classes', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
    });

    it('resolves conflicting Tailwind utility classes cleanly', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('ignores falsy, null, and undefined values', () => {
      const showActive = false;
      const isLarge = true;
      expect(cn('base-class', showActive && 'active', isLarge && 'text-lg', null, undefined)).toBe(
        'base-class text-lg'
      );
    });
  });
});
