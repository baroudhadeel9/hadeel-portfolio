'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { CertificateItem } from '@/lib/schemas';

interface CertificateZoomModalProps {
  cert: CertificateItem | null;
  isAr: boolean;
  onClose: () => void;
}

export const CertificateZoomModal: React.FC<CertificateZoomModalProps> = ({
  cert,
  isAr,
  onClose
}) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-zoom-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="min-w-0 pr-4">
            <h4 id="cert-zoom-title" className="text-sm font-bold text-zinc-900 truncate">
              {isAr ? cert.titleAr : cert.title}
            </h4>
            <span className="text-xs text-zinc-500">{cert.issuer}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق نافذة الشهادة' : 'Close certificate preview'}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1000px"
            className="object-contain"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
          <span>{cert.verificationType}</span>
          {cert.verificationCode && (
            <span className="font-mono text-zinc-700 font-medium">
              {cert.verificationCode}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
