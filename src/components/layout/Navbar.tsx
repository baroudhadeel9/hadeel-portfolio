'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { Dictionary } from '@/lib/schemas';
import { useScrollSpy } from '@/hooks/useScrollSpy';

interface NavbarProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  dict: Dictionary;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, dict }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection, scrollProgress } = useScrollSpy([
    'about',
    'projects',
    'certificates',
    'skills',
    'contact',
  ]);
  const scrolled = scrollProgress > 0.5;
  const isAr = lang === 'ar';

  const navLinks = [
    { id: 'about', href: '#about', label: dict.nav.about },
    { id: 'projects', href: '#projects', label: dict.nav.projects },
    { id: 'certificates', href: '#certificates', label: dict.nav.certificates },
    { id: 'skills', href: '#skills', label: dict.nav.skills },
    { id: 'contact', href: '#contact', label: dict.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Update hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full transition-all duration-200">
      {/* WCAG Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:text-xs sm:focus:text-sm focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white font-sans"
      >
        {isAr ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* Scroll Progress Bar at very top */}
      <div 
        className="h-[2.5px] bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)] transition-all duration-150 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Full-width sticky bar with clean light blur */}
      <nav
        className={`w-full transition-all duration-200 border-b border-slate-200/80 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3'
            : 'bg-white/85 backdrop-blur-md py-3.5 sm:py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Brand: Orbital hb. Logo + Name */}
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label={isAr ? 'الصفحة الرئيسية - هديل بارود' : 'Home - Hadeel Baroud'}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xs shrink-0 p-0.5 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="Eng. Hadeel Baroud"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 font-sans">
              {isAr ? 'هديل بارود' : 'Hadeel Baroud'}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-sans">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-500 hover:text-slate-900 font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 inset-x-0 h-[2px] bg-slate-950 rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions: Language Switcher Button + Desktop Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleLang}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-2xs font-sans"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>{dict.nav.langSwitch}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer font-tajawal active:scale-95"
            >
              <span>{dict.nav.contact}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:text-slate-950 transition-colors duration-200"
              aria-label={mobileMenuOpen ? (isAr ? 'إغلاق القائمة' : 'Close navigation menu') : (isAr ? 'فتح القائمة' : 'Open navigation menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer (Mobile-First) */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-5 py-4 space-y-2 shadow-xl animate-in fade-in duration-200 font-sans">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block py-2.5 px-3 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 bg-slate-100 font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all duration-200 cursor-pointer"
            >
              {dict.nav.hireMe}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
