import { describe, it, expect } from 'vitest';
import arDict from '../../data/locales/ar.json';
import enDict from '../../data/locales/en.json';

describe('i18n Dictionary Parity & Quality', () => {
  it('has identical top-level keys between Arabic and English', () => {
    const arKeys = Object.keys(arDict).sort();
    const enKeys = Object.keys(enDict).sort();
    expect(arKeys).toEqual(enKeys);
  });

  it('contains all required top-level application sections', () => {
    const requiredSections = [
      'nav',
      'hero',
      'projects',
      'skills',
      'certificates',
      'contact',
      'footer',
    ];
    for (const section of requiredSections) {
      expect(arDict).toHaveProperty(section);
      expect(enDict).toHaveProperty(section);
    }
  });

  it('has exact recursive key symmetry across all nested namespaces', () => {
    function getDeepKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      let keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          keys = keys.concat(getDeepKeys(value as Record<string, unknown>, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys.sort();
    }

    const arDeepKeys = getDeepKeys(arDict);
    const enDeepKeys = getDeepKeys(enDict);

    const missingInEn = arDeepKeys.filter(k => !enDeepKeys.includes(k));
    const missingInAr = enDeepKeys.filter(k => !arDeepKeys.includes(k));

    expect(missingInEn).toEqual([]);
    expect(missingInAr).toEqual([]);
  });

  it('contains no empty string translations', () => {
    function findEmptyStrings(obj: Record<string, unknown>, prefix = ''): string[] {
      let emptyPaths: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string' && value.trim() === '') {
          emptyPaths.push(fullKey);
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          emptyPaths = emptyPaths.concat(
            findEmptyStrings(value as Record<string, unknown>, fullKey)
          );
        }
      }
      return emptyPaths;
    }

    expect(findEmptyStrings(arDict)).toEqual([]);
    expect(findEmptyStrings(enDict)).toEqual([]);
  });
});
