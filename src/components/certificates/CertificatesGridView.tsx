'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { CertificateItem } from '@/types';

interface FilterTab {
  key: string;
  label: string;
}

interface CertificatesGridViewProps {
  filteredCerts: CertificateItem[];
  filterTabs: FilterTab[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isAr: boolean;
  onInspect: (cert: CertificateItem) => void;
}

export const CertificatesGridView: React.FC<CertificatesGridViewProps> = ({
  filteredCerts,
  filterTabs,
  activeCategory,
  setActiveCategory,
  isAr,
  onInspect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-2 font-tajawal">
        {filterTabs.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, cIdx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (cIdx % 6) * 0.08 }}
            className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div
              onClick={() => onInspect(cert)}
              className="relative aspect-[16/11] bg-slate-100 border-b border-slate-200 cursor-pointer overflow-hidden"
            >
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[1px] transition-opacity">
                <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold flex items-center gap-1 shadow-md font-tajawal">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تكبير' : 'Zoom'}</span>
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-600 block font-ibm">
                  {isAr ? cert.categoryLabel.ar : cert.categoryLabel.en}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 font-tajawal">
                  {isAr ? cert.titleAr : cert.title}
                </h3>
              </div>

              <p className="text-xs text-slate-700 line-clamp-2 font-ibm">
                {isAr ? cert.description.ar : cert.description.en}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="text-[11px] font-semibold font-ibm">{cert.issuer}</span>
                {cert.hours && (
                  <span className="text-[11px] font-bold text-slate-900 font-ibm">
                    {isAr ? cert.hoursAr : cert.hours}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
