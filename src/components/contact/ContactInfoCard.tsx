'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Copy,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import type { ProfileData, Dictionary } from '@/types';

// Custom icons
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.3a1.66 1.66 0 1 0 1.66 1.66A1.66 1.66 0 0 0 7.83 6.3z" />
  </svg>
);

interface ContactInfoCardProps {
  profile: ProfileData;
  dict: Dictionary;
  isAr: boolean;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ profile, dict, isAr }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const cleanPhone = (profile.contact.phoneIntl || '970598642728').replace(/[^0-9]/g, '');

  return (
    <div className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-slate-50/70 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
        <h3 className="text-base font-bold text-slate-900 font-tajawal">
          {dict.contact.directContact.title}
        </h3>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 font-ibm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? 'متاحة للعمل' : 'Available'}</span>
        </span>
      </div>

      <div className="space-y-3 font-ibm">
        {/* Phone & WhatsApp */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between gap-3 hover:border-slate-300 hover:shadow-xs transition-all">
          <a
            href={`tel:${profile.contact.phoneIntl || cleanPhone}`}
            className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer group"
            title={isAr ? 'اضغط للاتصال الهاتفي المباشر' : 'Tap to call directly'}
            aria-label={isAr ? 'اتصال هاتفي مباشر' : 'Direct phone call'}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-indigo-600 border border-slate-200 group-hover:border-indigo-200 transition-colors">
              <Phone className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-slate-700 font-medium">{dict.contact.directContact.phone}</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">{profile.contact.phone}</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-colors flex items-center gap-1.5 text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
            title="WhatsApp Chat"
            aria-label={isAr ? 'محادثة عبر واتساب' : 'Chat on WhatsApp'}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Email & One-Click Copy */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between gap-3 hover:border-slate-300 hover:shadow-xs transition-all">
          <a
            href={`mailto:${profile.contact.email}`}
            className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer group"
            title={isAr ? 'إرسال بريد إلكتروني مباشر' : 'Send direct email'}
            aria-label={isAr ? 'إرسال بريد إلكتروني' : 'Send direct email'}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-indigo-600 border border-slate-200 group-hover:border-indigo-200 transition-colors">
              <Mail className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-slate-700 font-medium">{dict.contact.directContact.email}</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5 truncate">{profile.contact.email}</div>
            </div>
          </a>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(profile.contact.email);
              setCopiedEmail(true);
              setTimeout(() => setCopiedEmail(false), 2000);
            }}
            aria-label={isAr ? 'نسخ البريد الإلكتروني إلى الحافظة' : 'Copy email address'}
            className="p-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 text-[11px] font-semibold shrink-0 cursor-pointer shadow-2xs"
            title="Copy Email"
          >
            {copiedEmail ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />}
            <span>{copiedEmail ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
          </button>
        </div>

        {/* Remote Availability */}
        <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-700 font-medium">{isAr ? 'العمل عن بُعد:' : 'Remote Collaboration:'}</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">
              {isAr ? 'متاحة للعملاء محلياً وإقليمياً ودولياً' : 'Open to regional & international engagements'}
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 font-tajawal">
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <GithubIcon className="w-3.5 h-3.5 text-slate-700" />
          <span>GitHub</span>
        </a>
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-indigo-600" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};
