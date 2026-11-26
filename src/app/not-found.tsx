import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] text-slate-800 flex items-center justify-center p-6 selection:bg-slate-900 selection:text-white">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold font-mono">
          <span>Error 404</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            الصفحة غير موجودة
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Page Not Found
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
          <br />
          <span className="text-slate-500 text-xs mt-1 block">
            The page you are looking for does not exist or has been relocated.
          </span>
        </p>

        {/* Back to Home CTA */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            العودة إلى الصفحة الرئيسية · Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
