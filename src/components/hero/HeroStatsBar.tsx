'use client';

import React, { useState, useEffect } from 'react';
import type { ProfileData } from '@/types';

// Convert western digits to eastern Arabic numerals
const toArabicDigits = (num: number | string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w] ?? w);
};

interface StatConfig {
  target: number;
  prefixAr?: string;
  suffixAr?: string;
  prefixEn?: string;
  suffixEn?: string;
}

const statConfigs: Record<number, StatConfig> = {
  0: { target: 11, prefixAr: '+', suffixAr: '', prefixEn: '', suffixEn: '+' },
  1: { target: 320, prefixAr: '+', suffixAr: '', prefixEn: '', suffixEn: '+' },
  2: { target: 100, prefixAr: '', suffixAr: '٪', prefixEn: '', suffixEn: '%' },
};

const AnimatedStatNumber: React.FC<{ index: number; isAr: boolean }> = ({ index, isAr }) => {
  const config = statConfigs[index] || { target: 10 };
  const [val, setVal] = useState<number>(config.target);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    let animId: number;

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.round(eased * config.target));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [config.target]);

  if (isAr) {
    const arabicNumber = toArabicDigits(val);
    return (
      <span dir="ltr" className="inline-flex items-center tabular-nums">
        {config.prefixAr && <span>{config.prefixAr}</span>}
        <span>{arabicNumber}</span>
        {config.suffixAr && <span>{config.suffixAr}</span>}
      </span>
    );
  }

  return (
    <span dir="ltr" className="inline-flex items-center tabular-nums">
      {config.prefixEn && <span>{config.prefixEn}</span>}
      <span>{val}</span>
      {config.suffixEn && <span>{config.suffixEn}</span>}
    </span>
  );
};

interface HeroStatsBarProps {
  stats: ProfileData['stats'];
  isAr: boolean;
}

export const HeroStatsBar: React.FC<HeroStatsBarProps> = ({ stats, isAr }) => {
  return (
    <div className="py-3 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs max-w-xl grid grid-cols-3 divide-x divide-slate-100 rtl:divide-x-reverse text-center">
      {stats.slice(0, 3).map((st, idx: number) => {
        const localizedLabel =
          typeof st.label === 'object' ? (isAr ? st.label.ar : st.label.en) : st.label;

        return (
          <div key={idx} className="px-2 py-0.5 flex flex-col justify-center items-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              <AnimatedStatNumber index={idx} isAr={isAr} />
            </div>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold leading-tight font-ibm">
              {localizedLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};
