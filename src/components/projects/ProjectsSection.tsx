'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  Lock,
  Layers
} from 'lucide-react';
import { ProjectItem, Dictionary } from '@/lib/schemas';

interface ProjectsSectionProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  projects: ProjectItem[];
}

// Interactive 3D Tilt & Cursor Spotlight Card Component
const InteractiveProjectCard: React.FC<{
  proj: ProjectItem;
  isAr: boolean;
  domain: string;
}> = ({ proj, isAr, domain }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Smooth subtle 3D perspective tilt (-4.5deg to +4.5deg)
    const rotateX = ((y - height / 2) / (height / 2)) * -4.5;
    const rotateY = ((x - width / 2) / (width / 2)) * 4.5;

    setTilt({
      x: rotateX,
      y: rotateY,
      glowX: (x / width) * 100,
      glowY: (y / height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50, active: false });
  };

  const liveHref = proj.liveUrl || '#';

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: tilt.active ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 lg:p-7 flex flex-col h-full justify-between hover:border-accent/40 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.08)] overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      {tilt.active && (
        <div 
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300 -z-0"
          style={{
            background: `radial-gradient(450px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(124, 58, 237, 0.08), transparent 70%)`
          }}
        />
      )}

      <div className="space-y-4 relative z-10 flex-1 flex flex-col">
        
        {/* Top Meta Bar: Category Pill & Live Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-accent bg-accent-tint border border-accent/20 flex items-center gap-1.5 font-ibm">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="truncate max-w-[170px]">{isAr ? proj.categoryAr : proj.category}</span>
          </span>
          
          {/* Live Indicator Badge */}
          {proj.liveUrl && (
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 transition-colors shadow-2xs"
              title={isAr ? 'المشروع متاح ويعمل مباشرة على السحابة' : 'Live Production'}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] tracking-wide font-bold">LIVE</span>
            </a>
          )}
        </div>

        {/* Clean Minimal Browser Frame for Preview with Direct Click to Live Site */}
        {proj.image && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-md group/window transition-all duration-300">
            {/* Browser Window Bar */}
            <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2" dir="ltr">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
              </div>
              {/* Mini Address Bar */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-200 font-mono tracking-tight max-w-[210px] truncate shadow-inner">
                <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">{domain}</span>
              </div>
              {/* Balance dot */}
              <div className="w-8 flex justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
            </div>

            {/* Project Screenshot Visual - Direct Link to Live Site */}
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`block relative aspect-[16/10] w-full overflow-hidden group/img ${
                proj.id === 'todo-app'
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-4 flex items-center justify-center'
                  : 'bg-slate-100 dark:bg-slate-950'
              } cursor-pointer`}
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill={proj.id !== 'todo-app'}
                width={proj.id === 'todo-app' ? 754 : undefined}
                height={proj.id === 'todo-app' ? 487 : undefined}
                sizes="(max-width: 768px) 100vw, 450px"
                className={
                  proj.id === 'todo-app'
                    ? 'object-contain max-h-full w-auto rounded-lg shadow-lg border border-slate-800 group-hover/window:scale-105 transition-transform duration-500 ease-out'
                    : 'object-cover object-top group-hover/window:scale-105 transition-transform duration-500 ease-out'
                }
              />
              {/* Hover Overlay with Live Demo Quick View Pill */}
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover/window:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <span className="px-4 py-2 rounded-xl bg-white text-navy text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/window:translate-y-0 transition-transform duration-300 font-tajawal">
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <span>{isAr ? 'زيارة الموقع الحي مباشرة' : 'Visit Live Website'}</span>
                </span>
              </div>
            </a>
          </div>
        )}

        {/* Title & Tagline - Direct Link to Live Site with unified minimum height */}
        <div>
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/title text-start w-full cursor-pointer"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-navy group-hover/title:text-accent transition-colors flex items-center justify-between font-tajawal">
              <span>{isAr ? proj.titleAr : proj.title}</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover/title:text-accent group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform shrink-0" />
            </h3>
          </a>
          <p className="text-sm sm:text-[13px] text-muted mt-2 leading-relaxed font-ibm line-clamp-3 min-h-[4.25rem]">
            {isAr ? proj.tagline.ar : proj.tagline.en}
          </p>
        </div>

        {/* Key Architecture Features - Unified Flex layout */}
        <div className="pt-3 space-y-2 border-t border-slate-100 dark:border-slate-800 flex-1 flex flex-col justify-start">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy font-ibm mb-1">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>{isAr ? 'أبرز مميزات المعمارية والوظائف:' : 'Core Architectural Highlights:'}</span>
          </div>
          {proj.features.slice(0, 3).map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-sm sm:text-[13px] text-muted">
              <div className="w-4 h-4 rounded-full bg-accent-tint border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div className="font-ibm leading-snug">
                <span className="font-bold text-navy">{isAr ? feat.title.ar : feat.title.en}: </span>
                <span className="text-muted">{isAr ? feat.desc.ar : feat.desc.en}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Actions & Tech Pills with unified height & alignment */}
      <div className="pt-5 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-3 relative z-10">
        
        {/* Tech Pills with consistent minimum height */}
        <div className="flex flex-wrap gap-1.5 min-h-[3rem] items-start content-start">
          {proj.tech.slice(0, 5).map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-navy bg-accent-tint/50 border border-accent/15 font-mono"
            >
              {t}
            </span>
          ))}
          {proj.tech.length > 5 && (
            <span className="px-2 py-1 rounded-lg text-xs font-medium text-accent bg-accent-tint border border-accent/25 font-mono">
              +{proj.tech.length - 5}
            </span>
          )}
        </div>

        {/* Single Primary Action: Visit Live Platform */}
        {proj.liveUrl && (
          <div className="pt-1 font-tajawal">
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-accent hover:bg-accent/90 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center group/btn active:scale-[0.99]"
            >
              <ExternalLink className="w-4 h-4 shrink-0 transition-transform group-hover/btn:scale-110" />
              <span>{isAr ? 'زيارة المنصة الحية مباشرة' : 'Visit Live Platform'}</span>
            </a>
          </div>
        )}

      </div>

    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, dict, projects }) => {
  const isAr = lang === 'ar';

  const getDomain = (url?: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-slate-950 text-navy scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-tint border border-accent/20 text-accent text-xs font-semibold font-ibm shadow-2xs">
            <FolderGit2 className="w-3.5 h-3.5 text-accent" />
            <span>{dict.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight font-tajawal">
            {dict.projects.title}
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed font-ibm max-w-2xl mx-auto">
            {dict.projects.subtitle}
          </p>
        </motion.div>

        {/* 3-Column Clean Minimal Grid with Staggered Scroll-Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {projects.map((proj, idx) => {
            const domain = getDomain(proj.liveUrl);

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <InteractiveProjectCard
                  proj={proj}
                  isAr={isAr}
                  domain={domain}
                />
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
