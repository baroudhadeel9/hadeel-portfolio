'use client';

import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/common/SocialIcons';
import { Dictionary, ProfileData } from '@/lib/schemas';

interface FooterProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ lang, dict, profile }) => {
  const isAr = lang === 'ar';
  const cleanPhone = (profile.contact.phoneIntl || '970598642728').replace(/[^0-9]/g, '');

  return (
    <footer 
      className="border-t border-slate-200/90 bg-white text-slate-600 py-12 relative overflow-hidden font-ibm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-900 shrink-0 p-0.5">
              <Image
                src="/logo-icon.png"
                alt="Eng. Hadeel Baroud"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 font-tajawal">
                {isAr ? 'المهندسة هديل عماد بارود' : 'Eng. Hadeel Emad Baroud'}
              </div>
              <div className="text-xs text-slate-700 font-medium font-ibm">
                {isAr ? 'هندسة حاسوب ونظم — جامعة الأزهر' : 'Computer Systems Engineering — Al-Azhar University'}
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-emerald-600 transition-all shadow-2xs"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 transition-all shadow-2xs"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 transition-all shadow-2xs"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 transition-all shadow-2xs"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-700 font-medium flex flex-col sm:flex-row items-center justify-between gap-2 font-ibm">
          <span>{dict.footer.rights}</span>
          <span>{dict.footer.tagline}</span>
        </div>

      </div>
    </footer>
  );
};
