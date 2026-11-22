'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Eye, 
  Grid, 
  BookMarked 
} from 'lucide-react';
import { CertificateItem } from '@/lib/schemas';
import { ClosedBookCover } from './ClosedBookCover';
import { CertificateZoomModal } from './CertificateZoomModal';
import { DocPage, DetailsPage } from './CertificateBookPage';

interface CertificatesSectionProps {
  lang: 'ar' | 'en';
  dict: any;
  certificates: CertificateItem[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ 
  lang, 
  dict, 
  certificates 
}) => {
  const isAr = lang === 'ar';
  
  const [viewMode, setViewMode] = useState<'book' | 'grid'>('book');
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [targetPageIndex, setTargetPageIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipType, setFlipType] = useState<'next' | 'prev' | null>(null);
  const [modalCert, setModalCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const handleOpenBook = () => {
    setIsBookOpen(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2200);
  };

  const filterTabs = [
    { key: 'all', label: dict.certificates.filterAll },
    { key: 'ai', label: dict.certificates.filterAI },
    { key: 'architecture', label: dict.certificates.filterArchitecture },
    { key: 'foundations', label: dict.certificates.filterFoundations },
    { key: 'web', label: dict.certificates.filterWeb },
    { key: 'javascript', label: dict.certificates.filterJS },
    { key: 'python', label: dict.certificates.filterPython },
  ];

  const filteredCerts = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(c => c.category === activeCategory);

  const totalPages = certificates.length;
  const currentCert = certificates[currentPageIndex] || certificates[0];
  const targetCert = certificates[targetPageIndex] || certificates[0];

  // Trigger the 180-degree physical page flip
  const triggerFlip = (direction: 'next' | 'prev', targetIndexOverride?: number) => {
    if (isFlipping) return;

    let nextIdx: number;
    if (typeof targetIndexOverride === 'number') {
      nextIdx = targetIndexOverride;
    } else {
      nextIdx = direction === 'next' 
        ? (currentPageIndex + 1) % totalPages 
        : (currentPageIndex - 1 + totalPages) % totalPages;
    }

    if (nextIdx === currentPageIndex) return;

    setTargetPageIndex(nextIdx);
    setFlipType(direction);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPageIndex(nextIdx);
      setIsFlipping(false);
      setFlipType(null);
    }, 850);
  };

  return (
    <section 
      id="certificates" 
      className="py-24 sm:py-32 relative overflow-hidden bg-[#f8fafc] text-[#0f172a] scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold font-ibm shadow-2xs">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>{dict.certificates.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-tajawal">
            {dict.certificates.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-ibm">
            {dict.certificates.subtitle}
          </p>

          {/* View Mode Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2 font-tajawal">
            <button
              type="button"
              onClick={() => setViewMode('book')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'book'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'عرض الكتاب التفاعلي' : 'Interactive Book'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{isAr ? 'عرض القائمة' : 'Grid View'}</span>
            </button>
          </div>
        </motion.div>

        {/* VIEW 1: INTERACTIVE OPEN / CLOSE BOOK */}
        {viewMode === 'book' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Book State Controls Bar */}
            <div className="mb-4 flex items-center justify-between text-xs px-2 font-ibm">
              <span className="text-slate-600 font-medium flex items-center gap-2">
                <span>{isBookOpen ? '📖' : '📕'}</span>
                <span>
                  {isBookOpen 
                    ? (isAr ? 'الكتاب مفتوح (انقري على "قلب الصفحة" لتنطوي الصفحة بالكامل)' : 'Book is open (Click "Flip Page" to turn 180°)') 
                    : (isAr ? 'الكتاب مغلق' : 'Book is closed')}
                </span>
              </span>
              
              <button
                type="button"
                onClick={() => { if (!isBookOpen) handleOpenBook(); else setIsBookOpen(false); }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer font-tajawal"
              >
                {isBookOpen ? (
                  <>
                    <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isAr ? 'إغلاق الكتاب' : 'Close Book'}</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isAr ? 'فتح الكتاب' : 'Open Book'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Closed Book View */}
            {!isBookOpen && (
              <ClosedBookCover 
                isAr={isAr}
                certificatesCount={certificates.length}
                onOpenBook={handleOpenBook}
              />
            )}

            {/* Open Book View With 180° Folding Leaf */}
            {isBookOpen && (
              <div className="transition-all duration-500">
                <div className="relative rounded-3xl p-3 sm:p-5 bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] book-depth-edge">
                  
                  {/* Bookmark Ribbon */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-9 bg-indigo-600 rounded-b-md shadow-sm z-40 flex items-center justify-center">
                    <span className="w-1 h-3.5 bg-white/50 rounded-full" />
                  </div>

                  {/* Desktop 2-Page Spread */}
                  <div className="hidden md:block">
                    <div className="book-stage relative rounded-2xl overflow-visible min-h-[510px] shadow-sm">
                      <div className="grid grid-cols-2 rounded-2xl overflow-hidden bg-white border border-[#E2DDD3] min-h-[510px]">
                        
                        {/* Base Left Page */}
                        <div className="relative h-full border-e border-[#EAE5DC]">
                          {isAr ? (
                            <DetailsPage 
                              cert={isFlipping && flipType === 'next' ? targetCert : currentCert}
                              pageNum={isFlipping && flipType === 'next' ? targetPageIndex : currentPageIndex}
                              totalPages={totalPages}
                              isAr={isAr}
                              dict={dict}
                              isInteractive={!isFlipping}
                              isFlipping={isFlipping}
                              onFlipPrev={() => triggerFlip('prev')}
                              onFlipNext={() => triggerFlip('next')}
                            />
                          ) : (
                            <DocPage 
                              cert={isFlipping && flipType === 'prev' ? targetCert : currentCert}
                              pageNum={isFlipping && flipType === 'prev' ? targetPageIndex : currentPageIndex}
                              totalPages={totalPages}
                              isAr={isAr}
                              isInteractive={!isFlipping}
                              onInspect={(c) => setModalCert(c)}
                            />
                          )}
                        </div>

                        {/* Base Right Page */}
                        <div className="relative h-full">
                          {isAr ? (
                            <DocPage 
                              cert={isFlipping && flipType === 'prev' ? targetCert : currentCert}
                              pageNum={isFlipping && flipType === 'prev' ? targetPageIndex : currentPageIndex}
                              totalPages={totalPages}
                              isAr={isAr}
                              isInteractive={!isFlipping}
                              onInspect={(c) => setModalCert(c)}
                            />
                          ) : (
                            <DetailsPage 
                              cert={isFlipping && flipType === 'next' ? targetCert : currentCert}
                              pageNum={isFlipping && flipType === 'next' ? targetPageIndex : currentPageIndex}
                              totalPages={totalPages}
                              isAr={isAr}
                              dict={dict}
                              isInteractive={!isFlipping}
                              isFlipping={isFlipping}
                              onFlipPrev={() => triggerFlip('prev')}
                              onFlipNext={() => triggerFlip('next')}
                            />
                          )}
                        </div>
                      </div>

                      {/* Center Book Spine Seam & Depth Shadow */}
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none z-20">
                        <div className="w-[1px] h-full mx-auto bg-black/20" />
                      </div>

                      {/* Flipping Leaf Animation */}
                      {isFlipping && isAr && flipType === 'next' && (
                        <div 
                          className="leaf-fold-l-to-r absolute top-0 left-0 w-1/2 h-full z-30 pointer-events-none rounded-l-2xl overflow-hidden"
                          style={{ transformOrigin: 'right center' }}
                        >
                          <div className="leaf-face-front rounded-l-2xl overflow-hidden bg-white shadow-md border-s border-zinc-200">
                            <DetailsPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} dict={dict} isInteractive={false} onFlipPrev={() => {}} onFlipNext={() => {}} />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/25" />
                          </div>
                          <div className="leaf-face-back rounded-r-2xl overflow-hidden bg-white shadow-md border-e border-zinc-200">
                            <DocPage cert={targetCert} pageNum={targetPageIndex} totalPages={totalPages} isAr={isAr} isInteractive={false} />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/25" />
                          </div>
                        </div>
                      )}

                      {isFlipping && isAr && flipType === 'prev' && (
                        <div 
                          className="leaf-fold-r-to-l absolute top-0 left-1/2 w-1/2 h-full z-30 pointer-events-none rounded-r-2xl overflow-hidden"
                          style={{ transformOrigin: 'left center' }}
                        >
                          <div className="leaf-face-front rounded-r-2xl overflow-hidden bg-white shadow-md border-e border-zinc-200">
                            <DocPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} isInteractive={false} />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/25" />
                          </div>
                          <div className="leaf-face-back rounded-l-2xl overflow-hidden bg-white shadow-md border-s border-zinc-200">
                            <DetailsPage cert={targetCert} pageNum={targetPageIndex} totalPages={totalPages} isAr={isAr} dict={dict} isInteractive={false} onFlipPrev={() => {}} onFlipNext={() => {}} />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/25" />
                          </div>
                        </div>
                      )}

                      {isFlipping && !isAr && flipType === 'next' && (
                        <div 
                          className="leaf-fold-r-to-l absolute top-0 left-1/2 w-1/2 h-full z-30 pointer-events-none rounded-r-2xl overflow-hidden"
                          style={{ transformOrigin: 'left center' }}
                        >
                          <div className="leaf-face-front rounded-r-2xl overflow-hidden bg-white shadow-md border-e border-zinc-200">
                            <DetailsPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} dict={dict} isInteractive={false} onFlipPrev={() => {}} onFlipNext={() => {}} />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/25" />
                          </div>
                          <div className="leaf-face-back rounded-l-2xl overflow-hidden bg-white shadow-md border-s border-zinc-200">
                            <DocPage cert={targetCert} pageNum={targetPageIndex} totalPages={totalPages} isAr={isAr} isInteractive={false} />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/25" />
                          </div>
                        </div>
                      )}

                      {isFlipping && !isAr && flipType === 'prev' && (
                        <div 
                          className="leaf-fold-l-to-r absolute top-0 left-0 w-1/2 h-full z-30 pointer-events-none rounded-l-2xl overflow-hidden"
                          style={{ transformOrigin: 'right center' }}
                        >
                          <div className="leaf-face-front rounded-l-2xl overflow-hidden bg-white shadow-md border-s border-zinc-200">
                            <DocPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} isInteractive={false} />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/25" />
                          </div>
                          <div className="leaf-face-back rounded-r-2xl overflow-hidden bg-white shadow-md border-e border-zinc-200">
                            <DetailsPage cert={targetCert} pageNum={targetPageIndex} totalPages={totalPages} isAr={isAr} dict={dict} isInteractive={false} onFlipPrev={() => {}} onFlipNext={() => {}} />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/25" />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="block md:hidden">
                    <div className={`space-y-4 rounded-2xl bg-white p-4 border border-[#E2DDD3] ${isFlipping ? 'animate-fold-mobile' : ''}`}>
                      <DocPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} isInteractive={true} onInspect={(c) => setModalCert(c)} />
                      <div className="border-t border-zinc-100 pt-2">
                        <DetailsPage cert={currentCert} pageNum={currentPageIndex} totalPages={totalPages} isAr={isAr} dict={dict} isInteractive={true} onFlipPrev={() => triggerFlip('prev')} onFlipNext={() => triggerFlip('next')} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: CLASSIC GRID */}
        {viewMode === 'grid' && (
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
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
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (cIdx % 6) * 0.08 }}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div 
                    onClick={() => setModalCert(cert)}
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

                    <p className="text-xs text-slate-600 line-clamp-2 font-ibm">
                      {isAr ? cert.description.ar : cert.description.en}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="text-[11px] font-medium font-ibm">{cert.issuer}</span>
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
        )}

        {/* Certificate Zoom Inspection Modal */}
        <CertificateZoomModal 
          cert={modalCert}
          isAr={isAr}
          onClose={() => setModalCert(null)}
        />

      </div>

      {/* Celebration Starburst Particle Explosion */}
      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const angle = (i / 45) * 360;
            const distance = 90 + ((i * 17) % 240);
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;
            const colors = ['#6366f1', '#a855f7', '#ec4899', '#eab308', '#10b981', '#3b82f6'];
            const color = colors[i % colors.length];
            const size = 6 + (i % 8);

            return (
              <span
                key={i}
                className="absolute rounded-full animate-ping"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  transform: `translate(${x}px, ${y}px)`,
                  transition: 'all 1.4s cubic-bezier(0.1, 0.9, 0.2, 1)',
                  boxShadow: `0 0 12px ${color}`
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
