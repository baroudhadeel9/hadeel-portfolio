'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import type { Locale, Dictionary } from '@/types';
import arDict from '../../../data/locales/ar.json';
import enDict from '../../../data/locales/en.json';

interface LocaleContextType {
  lang: Locale;
  isAr: boolean;
  dict: Dictionary;
  toggleLanguage: () => void;
  setLanguage: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = 'hadeel_portfolio_locale';

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  initialLocale = 'en',
}) => {
  // Lazy state initializer: reads localStorage on initial render without cascading renders
  const [lang, setLang] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (saved && (saved === 'ar' || saved === 'en')) {
          return saved;
        }
      } catch {
        // Fallback
      }
    }
    return initialLocale;
  });

  // Sync document attributes and font styling on language change
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      if (lang === 'ar') {
        document.body.style.fontFamily =
          'var(--font-almarai), system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      } else {
        document.body.style.fontFamily =
          'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      }

      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Safe fallback
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setLanguage = (locale: Locale) => {
    setLang(locale);
  };

  const dict = lang === 'ar' ? arDict : enDict;

  return (
    <LocaleContext.Provider
      value={{
        lang,
        isAr: lang === 'ar',
        dict,
        toggleLanguage,
        setLanguage,
      }}
    >
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LocaleContext.Provider>
  );
};

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
