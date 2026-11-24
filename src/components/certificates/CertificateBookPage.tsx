'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Copy,
  Check,
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { CertificateItem, Dictionary } from '@/lib/schemas';

interface DocPageProps {
  cert: CertificateItem;
  pageNum: number;
  totalPages: number;
  isAr: boolean;
  isInteractive?: boolean;
  onInspect?: (cert: CertificateItem) => void;
}

export const DocPage: React.FC<DocPageProps> = ({
  cert,
  pageNum,
  totalPages,
  isAr,
  isInteractive = true,
  onInspect,
}) => {
  return (
    <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-white relative overflow-hidden select-none">
      {/* Gutter curve shadow towards spine */}
      <div
        className={`hidden md:block absolute top-0 bottom-0 ${isAr
            ? 'left-0 bg-gradient-to-r from-black/8 to-transparent'
            : 'right-0 bg-gradient-to-l from-black/8 to-transparent'
          } w-8 pointer-events-none z-10`}
      />

      {/* Header Info */}
      <div className="flex items-center justify-between text-xs text-zinc-700 pb-3 border-b border-zinc-100">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-600">
          {isAr ? `صفحة ${pageNum + 1} من ${totalPages}` : `PAGE ${pageNum + 1} OF ${totalPages}`}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[11px] font-semibold border border-indigo-200/60 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
          <span>{cert.issuer}</span>
        </span>
      </div>

      {/* Certificate Framed Canvas */}
      <div
        onClick={() => isInteractive && onInspect?.(cert)}
        className={`my-auto relative aspect-[16/11] rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-50 shadow-sm group ${isInteractive ? 'cursor-pointer' : 'pointer-events-none'
          }`}
      >
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 450px"
          className="object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Hover Inspect Pill */}
        {isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/25 backdrop-blur-[1px] transition-opacity">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isAr ? 'تكبير الشهادة الأصلية' : 'Inspect Certificate'}</span>
            </span>
          </div>
        )}

        <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs border border-zinc-200/80 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-600 font-medium">
        <span>{cert.date || (isAr ? 'اعتماد موثق' : 'Verified Credential')}</span>
        <span>{isAr ? 'اضغط للمعاينة والتكبير' : 'Click to inspect'}</span>
      </div>
    </div>
  );
};

interface DetailsPageProps {
  cert: CertificateItem;
  pageNum: number;
  totalPages: number;
  isAr: boolean;
  dict: Dictionary;
  isInteractive?: boolean;
  isFlipping?: boolean;
  onFlipPrev: () => void;
  onFlipNext: () => void;
}

export const DetailsPage: React.FC<DetailsPageProps> = ({
  cert,
  pageNum,
  totalPages,
  isAr,
  dict,
  isInteractive = true,
  isFlipping = false,
  onFlipPrev,
  onFlipNext,
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-white relative overflow-hidden select-none">
      {/* Gutter curve shadow towards spine */}
      <div
        className={`hidden md:block absolute top-0 bottom-0 ${isAr
            ? 'right-0 bg-gradient-to-l from-black/8 to-transparent'
            : 'left-0 bg-gradient-to-r from-black/8 to-transparent'
          } w-8 pointer-events-none z-10`}
      />

      {/* Category & Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/50">
            {isAr ? cert.categoryLabel.ar : cert.categoryLabel.en}
          </span>
          {cert.highlight && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              {isAr ? 'مميزة ★' : 'Featured ★'}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
          {isAr ? cert.titleAr : cert.title}
        </h3>
      </div>

      {/* Syllabus / Description */}
      <div className="my-auto py-3">
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-800 leading-relaxed">
          {isAr ? cert.description.ar : cert.description.en}
        </div>
      </div>

      {/* Verification & Hours */}
      <div className="space-y-2.5">
        {cert.verificationCode ? (
          <div className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100/80 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <span className="text-zinc-600 block text-[10px] font-semibold">{dict.certificates.verifyCode}</span>
              <span className="font-mono text-zinc-900 font-bold truncate block mt-0.5 text-xs">{cert.verificationCode}</span>
            </div>
            {isInteractive && (
              <button
                type="button"
                onClick={() => handleCopyCode(cert.verificationCode!)}
                className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition-colors cursor-pointer shadow-2xs shrink-0"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-700" />}
              </button>
            )}
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-800 flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{cert.verificationType}</span>
          </div>
        )}

        {cert.hours && (
          <div className="flex items-center gap-2 text-xs text-zinc-800 font-medium px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-100">
            <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{isAr ? cert.hoursAr : cert.hours}</span>
          </div>
        )}
      </div>

      {/* Page Turning Navigation Buttons */}
      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={!isInteractive || isFlipping}
          onClick={onFlipPrev}
          className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
        >
          <ChevronRight className={`w-3.5 h-3.5 ${isAr ? '' : 'rotate-180'}`} />
          <span>{isAr ? 'الصفحة السابقة' : 'Prev Page'}</span>
        </button>

        <span className="text-xs font-mono font-bold text-zinc-800 px-2">
          {pageNum + 1} / {totalPages}
        </span>

        <button
          type="button"
          disabled={!isInteractive || isFlipping}
          onClick={onFlipNext}
          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
        >
          <span>{isAr ? 'الصفحة التالية' : 'Next Page'}</span>
          <ChevronLeft className={`w-3.5 h-3.5 ${isAr ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </div>
  );
};
