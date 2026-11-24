'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { ProfileData, ProjectItem, CertificateItem, SkillsData } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/hero/Hero';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { CertificatesSection } from '@/components/certificates/CertificatesSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';

// Dynamically lazy-load AI Assistant Bot to minimize initial JS bundle size
const AIAssistantBot = dynamic(
  () => import('@/components/bot/AIAssistantBot').then((mod) => mod.AIAssistantBot),
  { ssr: false }
);

interface HomeContentProps {
  profile: ProfileData;
  projects: ProjectItem[];
  certificates: CertificateItem[];
  skillsData: SkillsData;
}

export const HomeContent: React.FC<HomeContentProps> = ({
  profile,
  projects,
  certificates,
  skillsData,
}) => {
  const { lang, dict, toggleLanguage } = useLocale();

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#FAFAFC] text-slate-800 transition-colors duration-300 relative selection:bg-slate-900 selection:text-white"
    >
      {/* Top Fixed Navigation */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} dict={dict} />

      {/* Hero Section */}
      <Hero lang={lang} dict={dict} profile={profile} />

      {/* Featured Projects (Coach Space & EduHub) */}
      <ProjectsSection lang={lang} dict={dict} projects={projects} />

      {/* Verified Accreditations & 11 Certificates in Interactive Book View */}
      <CertificatesSection lang={lang} dict={dict} certificates={certificates} />

      {/* Skills Matrix & Engineering Tools */}
      <SkillsSection lang={lang} dict={dict} skillsData={skillsData} />

      {/* Contact Section */}
      <ContactSection lang={lang} dict={dict} profile={profile} />

      {/* Minimal Footer */}
      <Footer lang={lang} dict={dict} profile={profile} />

      {/* Floating Interactive AI Assistant Bot */}
      <AIAssistantBot lang={lang} dict={dict} profile={profile} />
    </main>
  );
};
