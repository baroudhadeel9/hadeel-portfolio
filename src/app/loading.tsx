import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-6" aria-busy="true" aria-label="Loading portfolio content">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Brand Orb */}
        <div className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-sm tracking-wider">HB</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-1 -right-1 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-1 -right-1" />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
