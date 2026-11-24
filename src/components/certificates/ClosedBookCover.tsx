'use client';

import React from 'react';
import Image from 'next/image';

interface ClosedBookCoverProps {
  isAr: boolean;
  certificatesCount: number;
  onOpenBook: () => void;
}

export const ClosedBookCover: React.FC<ClosedBookCoverProps> = ({
  isAr,
  certificatesCount,
  onOpenBook
}) => {
  return (
    <div className="flex justify-center py-6 sm:py-8">
      <div 
        onClick={onOpenBook}
        className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[1/1.45] rounded-3xl p-7 sm:p-9 flex flex-col justify-between items-center text-center cursor-pointer group transition-all duration-500 hover:scale-[1.03] hover:-rotate-1 shadow-[0_25px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_rgba(79,70,229,0.22)] border border-slate-800 bg-slate-900 overflow-hidden"
      >
        {/* Top-Left Bookmark Ribbon in Indigo */}
        <div className="absolute top-0 left-6 sm:left-8 w-6 sm:w-7 h-16 sm:h-20 bg-indigo-600 shadow-md z-20 pointer-events-none" />

        {/* Interactive Diagonal Light Sheen */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />

        {/* Right Edge: Vertical Spine */}
        <div className="absolute top-0 bottom-0 right-0 w-3.5 sm:w-4.5 bg-slate-950 rounded-r-3xl z-10 pointer-events-none shadow-[-2px_0_8px_rgba(0,0,0,0.4)]" />

        {/* Top / Center Content */}
        <div className="flex flex-col items-center w-full pt-4 sm:pt-6 z-10">
          {/* HB Rounded Square Badge with Official Orbital Logo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-slate-700 shadow-lg flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105 relative overflow-hidden">
            <Image
              src="/logo-icon.png"
              alt="HB Logo"
              width={96}
              height={96}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Name: هديل بارود */}
          <h3 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-black text-white font-tajawal tracking-tight">
            {isAr ? 'هديل بارود' : 'Hadeel Baroud'}
          </h3>

          {/* Divider Line */}
          <div className="w-16 sm:w-20 h-1 rounded-full bg-slate-700 mt-3" />

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300 font-ibm">
            {isAr ? `جامعة الأزهر · ${certificatesCount} شهادات مهنية معتمدة` : `Al-Azhar University · ${certificatesCount} Verified Credentials`}
          </p>
        </div>

        {/* Bottom Action Button: تصفح ألبوم الشهادات */}
        <div className="w-full pt-4 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenBook();
            }}
            className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base font-tajawal shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isAr ? 'تصفح ألبوم الشهادات المعتمدة' : 'Explore Verified Album'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
