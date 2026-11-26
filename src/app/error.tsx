'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-800 flex items-center justify-center p-6 selection:bg-slate-900 selection:text-white">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold font-mono">
          <span>Application Error</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            An unexpected error occurred
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          نعتذر عن هذا الخلل المؤقت. يمكنك المحاولة مرة أخرى أو تحديث الصفحة.
          <br />
          <span className="text-slate-500 text-xs mt-1 block">
            We apologize for the temporary inconvenience. You can retry the operation.
          </span>
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            إعادة المحاولة · Retry
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex-1 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-all active:scale-[0.98] cursor-pointer"
          >
            تحديث · Reload
          </button>
        </div>
      </div>
    </main>
  );
}
