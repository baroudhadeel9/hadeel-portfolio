'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import type { ProjectItem, Dictionary } from '@/types';
import { InteractiveProjectCard } from './InteractiveProjectCard';

interface ProjectsSectionProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, dict, projects }) => {
  const isAr = lang === 'ar';

  const getDomain = (url?: string): string => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      const parts = url.replace(/^https?:\/\//, '').split('/');
      return parts[0] ?? '';
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 relative overflow-hidden bg-white text-[#0f172a] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold font-ibm shadow-2xs">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{dict.projects.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-tajawal break-words">
            {dict.projects.title}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-ibm max-w-2xl mx-auto">
            {dict.projects.subtitle}
          </p>
        </motion.div>

        {/* 3-Column Clean Minimal Grid with Staggered Scroll-Entrance */}
        {projects.length === 0 ? (
          <div className="text-center py-12 p-8 rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-ibm">
            {dict.projects.empty}
          </div>
        ) : (
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
                    dict={dict}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
};
