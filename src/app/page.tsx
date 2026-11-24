'use client';

import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

// Data Imports from JSON files
import profileData from '../../data/profile.json';
import certificatesData from '../../data/certificates.json';
import projectsData from '../../data/projects.json';
import skillsData from '../../data/skills.json';
import arDict from '../../data/locales/ar.json';
import enDict from '../../data/locales/en.json';

// Components
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

import {
  CertificateSchema,
  ProjectSchema,
  ProfileSchema,
  SkillsDataSchema,
  type CertificateItem,
  type ProjectItem,
  type ProfileData,
  type SkillsData,
} from '@/lib/schemas';

const parsedProjects: ProjectItem[] = ProjectSchema.array().parse(projectsData);
const parsedCertificates: CertificateItem[] = CertificateSchema.array().parse(certificatesData);
const parsedProfile: ProfileData = ProfileSchema.parse(profileData);
const parsedSkills: SkillsData = SkillsDataSchema.parse(skillsData);

export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('en');

  const dict = lang === 'ar' ? arDict : enDict;

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
  };

  useEffect(() => {
    // Dynamically update document dir and lang attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.body.style.fontFamily = 'var(--font-almarai), -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
    } else {
      document.body.style.fontFamily = 'var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
    }
  }, [lang]);

  return (
    <main 
      className="min-h-screen relative flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-slate-900 selection:text-white"
    >
      
      {/* Top Fixed Navigation */}
      <Navbar 
        lang={lang} 
        onToggleLang={toggleLanguage} 
        dict={dict} 
      />

      {/* Hero Section */}
      <Hero 
        lang={lang} 
        dict={dict} 
        profile={parsedProfile} 
      />

      {/* Featured Projects (Coach Space & EduHub) - Clean & Elegant */}
      <ProjectsSection 
        lang={lang} 
        dict={dict} 
        projects={parsedProjects} 
      />

      {/* Verified Accreditations & 11 Certificates in Interactive Book View */}
      <CertificatesSection 
        lang={lang} 
        dict={dict} 
        certificates={parsedCertificates} 
      />

      {/* Skills Matrix & Engineering Tools */}
      <SkillsSection 
        lang={lang} 
        dict={dict} 
        skillsData={parsedSkills} 
      />

      {/* Contact Section */}
      <ContactSection 
        lang={lang} 
        dict={dict} 
        profile={profileData} 
      />

      {/* Footer */}
      <Footer 
        lang={lang} 
        dict={dict} 
        profile={profileData} 
      />

      {/* Floating Interactive AI Assistant Bot */}
      <AIAssistantBot 
        lang={lang} 
        dict={dict} 
        profile={profileData} 
      />

    </main>
  );
}
