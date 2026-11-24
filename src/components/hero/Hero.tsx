'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/common/SocialIcons';
import { Dictionary, ProfileData } from '@/lib/schemas';

interface HeroProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  profile: ProfileData;
}

// Convert western digits to eastern Arabic numerals
const toArabicDigits = (num: number | string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w]);
};

interface StatConfig {
  target: number;
  prefixAr?: string;
  suffixAr?: string;
  prefixEn?: string;
  suffixEn?: string;
}

const statConfigs: Record<number, StatConfig> = {
  0: { target: 8, prefixAr: '+', suffixAr: '', prefixEn: '', suffixEn: '+' },
  1: { target: 320, prefixAr: '+', suffixAr: '', prefixEn: '', suffixEn: '+' },
  2: { target: 100, prefixAr: '', suffixAr: '٪', prefixEn: '', suffixEn: '%' }
};

// Animated Counting Number Component - Mobile-Optimized & Robust
const AnimatedStatNumber: React.FC<{ index: number; isAr: boolean }> = ({ index, isAr }) => {
  const config = statConfigs[index] || { target: 10 };
  const [val, setVal] = useState<number>(config.target);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    let animId: number;

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.round(eased * config.target));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [config.target]);

  if (isAr) {
    const arabicNumber = toArabicDigits(val);
    return (
      <span dir="ltr" className="inline-flex items-center tabular-nums">
        {config.prefixAr && <span>{config.prefixAr}</span>}
        <span>{arabicNumber}</span>
        {config.suffixAr && <span>{config.suffixAr}</span>}
      </span>
    );
  }

  return (
    <span dir="ltr" className="inline-flex items-center tabular-nums">
      {config.prefixEn && <span>{config.prefixEn}</span>}
      <span>{val}</span>
      {config.suffixEn && <span>{config.suffixEn}</span>}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ lang, dict, profile }) => {
  const isAr = lang === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const cleanPhone = (profile?.contact?.phoneIntl || '970598642728').replace(/[^0-9]/g, '');

  const marqueeSkills = [
    'Next.js 16 App Router',
    'React 19 Server Components',
    'TypeScript',
    'Laravel 11 API',
    'PostgreSQL & Supabase',
    'Pessimistic DB Locking',
    'Three.js & R3F (3D)',
    'Framer Motion',
    'Tailwind CSS v4',
    'Turbopack Engine',
    'Redux Toolkit',
    'Zod Validation',
    'Brevo Notifications',
    'Al-Azhar University',
    '8 Verified Certifications'
  ];

  return (
    <section
      id="about"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#f8fafc] text-[#0f172a] scroll-mt-24"
    >
      {/* Subtle Minimal Dot Grid Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Soft Ambient Warmth Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-slate-200/50 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-36 right-10 w-[380px] h-[380px] bg-indigo-50/70 blur-[100px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Main Text Column: Clean, Spacious, and Minimal */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 text-center lg:text-start"
          >
            {/* Single Elegant Academic & Engineering Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs font-ibm">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isAr ? 'هندسة أنظمة حاسوب · جامعة الأزهر' : 'Computer Systems Engineering · Al-Azhar University'}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.12] font-tajawal">
              {dict.hero.name}
            </h1>

            {/* Specialization / Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-700 leading-snug font-tajawal max-w-xl">
              {isAr
                ? 'مهندسة أنظمة حاسوب ومطورة ويب Full-Stack معتمدة في الذكاء الاصطناعي'
                : 'Computer Systems Engineer & AI-Integrated Full-Stack Developer'}
            </p>

            {/* Concise Bio */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-ibm">
              {dict.hero.description}
            </p>

            {/* Clean Unified Horizontal Stats Bar (Stripe/Linear Style) */}
            <div className="py-3 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs max-w-xl grid grid-cols-3 divide-x divide-slate-100 rtl:divide-x-reverse text-center">
              {profile.stats.slice(0, 3).map((st, idx: number) => {
                const localizedLabel = typeof st.label === 'object'
                  ? (isAr ? st.label.ar : st.label.en)
                  : st.label;

                return (
                  <div key={idx} className="px-2 py-0.5 flex flex-col justify-center items-center">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                      <AnimatedStatNumber index={idx} isAr={isAr} />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-medium leading-tight font-ibm">
                      {localizedLabel}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons & Social Icons Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Primary Dark Pill Button */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer group font-tajawal"
              >
                <span>{dict.hero.ctaProjects}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </motion.a>

              {/* Secondary Clean White Border Button */}
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer font-tajawal"
              >
                <span>{dict.hero.ctaContact}</span>
              </motion.a>

              {/* Social Icons Group */}
              <div className="flex items-center gap-2 ms-1">
                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${profile.contact.email}`}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-600 hover:text-sky-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-600 hover:text-slate-950 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
              </div>

            </div>

          </motion.div>

          {/* Visual Showcase Column: Clean, Elegant Portrait */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center w-full max-w-sm">
              {/* Soft Ambient Studio Halo */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-indigo-200/50 via-purple-100/30 to-sky-100/40 rounded-[3rem] blur-2xl pointer-events-none -z-0" />

              {/* Portrait Frame in Modern Rounded Squircle Frame */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-92 rounded-[2.5rem] p-2 bg-white shadow-xl border border-slate-200/90 z-10 overflow-hidden">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-slate-100">
                  <Image
                    src="/hadeel-profile.jpg"
                    alt="Eng. Hadeel Baroud"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-[center_12%]"
                  />
                </div>
              </div>

              {/* Floating Bottom Badge: Clean Single Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-3.5 z-20 cursor-pointer shadow-lg"
              >
                <div className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-md font-ibm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Next.js 16 • React 19 • Laravel 11</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Centered Kinetic Tech Marquee Ribbon at bottom of Hero */}
      <div className="mt-14 sm:mt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-2.5 px-3 rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-md text-slate-800 overflow-hidden relative shadow-2xs"
        >
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className={isAr ? 'animate-marquee-rtl flex gap-6 items-center' : 'animate-marquee-ltr flex gap-6 items-center'}>
            {[...marqueeSkills, ...marqueeSkills].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 whitespace-nowrap shadow-2xs hover:border-slate-300 hover:text-slate-900 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};