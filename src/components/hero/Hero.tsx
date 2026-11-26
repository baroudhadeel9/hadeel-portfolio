'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
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

import { HeroStatsBar } from './HeroStatsBar';

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
    '11 Verified Certifications'
  ];

  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const isMarqueeInView = useInView(marqueeContainerRef, { margin: '150px' });

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 text-center lg:text-start"
          >
            {/* Single Elegant Academic & Engineering Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs font-ibm">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>{dict.hero.universityBadge}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.12] font-tajawal">
              {dict.hero.name}
            </h1>

            {/* Specialization / Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 leading-snug font-tajawal max-w-xl">
              {dict.hero.subspecialty}
            </p>

            {/* Concise Bio with High Contrast */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl font-ibm">
              {dict.hero.description}
            </p>

            {/* Clean Unified Horizontal Stats Bar (Stripe/Linear Style) */}
            <HeroStatsBar stats={profile.stats} isAr={isAr} />

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
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="WhatsApp"
                  aria-label={dict.hero.chatWhatsApp}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${profile.contact.email}`}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="Email"
                  aria-label={dict.hero.sendEmail}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-600 hover:text-sky-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="LinkedIn"
                  aria-label={dict.hero.viewLinkedIn}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-600 hover:text-slate-950 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="GitHub"
                  aria-label={dict.hero.viewGitHub}
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
              </div>

            </div>

          </motion.div>

          {/* Visual Showcase Column: Clean, Elegant Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
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
      <div ref={marqueeContainerRef} className="mt-14 sm:mt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-2.5 px-3 rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-md text-slate-800 overflow-hidden relative shadow-2xs"
        >
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className={isAr ? 'animate-marquee-rtl flex gap-6 items-center' : 'animate-marquee-ltr flex gap-6 items-center'}
            style={{ animationPlayState: isMarqueeInView ? 'running' : 'paused' }}
          >
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