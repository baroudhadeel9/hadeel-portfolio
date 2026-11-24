'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award,
  Terminal
} from 'lucide-react';
import { Dictionary, ProfileData } from '@/lib/schemas';

interface AboutPhilosophySectionProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  profile: ProfileData;
}

export const AboutPhilosophySection: React.FC<AboutPhilosophySectionProps> = ({
  lang,
  dict,
  profile,
}) => {
  const isAr = lang === 'ar';
  const phil = dict.philosophy;

  const pillars = [
    {
      key: 'architecture',
      icon: Cpu,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100',
      title: phil.pillars.architecture.title,
      desc: phil.pillars.architecture.desc,
      tag: isAr ? 'معمارية متينة' : 'Robust Architecture'
    },
    {
      key: 'ai',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
      title: phil.pillars.ai.title,
      desc: phil.pillars.ai.desc,
      tag: isAr ? 'ذكاء اصطناعي معتمد' : 'Verified AI Systems'
    },
    {
      key: 'quality',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
      title: phil.pillars.quality.title,
      desc: phil.pillars.quality.desc,
      tag: isAr ? 'أمان وموثوقية' : 'Type-Safe & Secure'
    },
  ];

  return (
    <section 
      id="about" 
      className="py-20 sm:py-28 relative overflow-hidden bg-white text-[#0f172a] scroll-mt-20 border-b border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold font-ibm shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>{phil.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-tajawal">
            {phil.title}
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-ibm max-w-2xl mx-auto">
            {phil.subtitle}
          </p>
        </motion.div>

        {/* Main Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left / Primary Column (7 cols): 3 Engineering Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-slate-200/90 bg-[#FBFBFE] p-5 sm:p-6 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl ${pillar.bgColor} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-tajawal leading-snug">
                          {pillar.title}
                        </h3>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 font-ibm">
                          {pillar.tag}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-ibm">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Engineering Quote Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 border border-slate-800 shadow-md relative overflow-hidden"
            >
              <div className="relative z-10 flex items-start gap-3">
                <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <blockquote className="text-xs sm:text-sm text-slate-200 italic font-tajawal leading-relaxed">
                  {phil.quote}
                </blockquote>
              </div>
            </motion.div>
          </div>

          {/* Right / Secondary Column (5 cols): Biography & Education Highlight Card */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="h-full rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6"
            >
              {/* Profile Image & Identification */}
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-100 shrink-0">
                  <Image
                    src="/hadeel-profile.jpg"
                    alt={isAr ? profile.name.ar : profile.name.en}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-700 font-ibm">
                      {phil.story.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 font-tajawal leading-tight truncate">
                    {isAr ? profile.name.ar : profile.name.en}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold font-ibm truncate">
                    {phil.story.degree}
                  </p>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-ibm">
                <p>{phil.story.p1}</p>
                <p>{phil.story.p2}</p>
              </div>

              {/* Verified Credentials Pills Grid */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-ibm">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold">{phil.story.university}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-700 font-ibm">
                  <Award className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{isAr ? '8+ شهادات دولية معتمدة' : '8+ Verified Global Certifications'}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-700 font-ibm">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{isAr ? '+320 ساعة تدريب هندسي مكثف' : '320+ Intensive Engineering Training Hours'}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-ibm">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{phil.story.location}</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
