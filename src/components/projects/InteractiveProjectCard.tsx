'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Lock,
  ExternalLink,
  ArrowUpRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import type { ProjectItem, Dictionary } from '@/types';

interface InteractiveProjectCardProps {
  proj: ProjectItem;
  isAr: boolean;
  domain: string;
  dict: Dictionary;
}

export const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  proj,
  isAr,
  domain,
  dict,
}) => {
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
        transition: tilt.active ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:border-slate-300 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      {tilt.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300 -z-0"
          style={{
            background: `radial-gradient(450px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(99, 102, 241, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="space-y-4 relative z-10 flex-1 flex flex-col">
        {/* Top Meta Bar: Category Pill & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-slate-800 bg-slate-100 border border-slate-200 flex items-center gap-1.5 font-ibm">
            <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
            <span className="whitespace-normal">{isAr ? proj.categoryAr : proj.category}</span>
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
            <div
              className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2"
              dir="ltr"
            >
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
              className="block relative aspect-[16/10] w-full overflow-hidden group/img bg-slate-100 cursor-pointer"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-top group-hover/window:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Hover Overlay with Live Demo Quick View Pill */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/window:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/window:translate-y-0 transition-transform duration-300 font-tajawal">
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{dict.projects.visitLive}</span>
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
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 group-hover/title:text-indigo-600 transition-colors flex items-start sm:items-center justify-between gap-2 font-tajawal">
              <span className="break-words leading-snug">{isAr ? proj.titleAr : proj.title}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/title:text-indigo-600 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform shrink-0 mt-1 sm:mt-0" />
            </h3>
          </a>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-ibm line-clamp-3 min-h-[4.25rem]">
            {isAr ? proj.tagline.ar : proj.tagline.en}
          </p>
        </div>

        {/* Key Architecture Features - Unified Flex layout */}
        <div className="pt-3 space-y-2 border-t border-slate-100 flex-1 flex flex-col justify-start">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 font-ibm mb-1">
            <Layers className="w-3 h-3 text-indigo-600" />
            <span>{dict.projects.archHighlights}</span>
          </div>
          {proj.features.slice(0, 3).map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-800">
              <div className="w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div className="font-ibm leading-snug">
                <span className="font-bold text-slate-900">{isAr ? feat.title.ar : feat.title.en}: </span>
                <span className="text-slate-700">{isAr ? feat.desc.ar : feat.desc.en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions & Tech Pills with unified height & alignment */}
      <div className="pt-5 mt-4 border-t border-slate-100 space-y-3 relative z-10">
        {/* Tech Pills with consistent minimum height */}
        <div className="flex flex-wrap gap-1.5 min-h-[3rem] items-start content-start">
          {proj.tech.slice(0, 5).map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-800 bg-slate-100 border border-slate-200/80 font-mono"
            >
              {t}
            </span>
          ))}
          {proj.tech.length > 5 && (
            <span className="px-2 py-1 rounded-lg text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/80 font-mono">
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
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center group/btn active:scale-[0.99]"
            >
              <ExternalLink className="w-4 h-4 shrink-0 transition-transform group-hover/btn:scale-110" />
              <span>{dict.projects.visitPlatform}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
