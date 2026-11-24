'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  MapPin,
  Copy
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/common/SocialIcons';
import { ContactFormSchema, ContactFormData, Dictionary, ProfileData } from '@/lib/schemas';

// Contact Container with subtle cursor spotlight
const ContactSpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setGlow(prev => ({ ...prev, active: false }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {glow.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(99, 102, 241, 0.08), transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface ContactSectionProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  lang, 
  dict, 
  profile 
}) => {
  const isAr = lang === 'ar';
  const cleanPhone = (profile.contact.phoneIntl || '970598642728').replace(/[^0-9]/g, '');

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'web-app',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [sentVia, setSentVia] = useState<'api' | 'whatsapp' | 'email' | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const WEB3FORMS_ACCESS_KEY = '6020b837-a36a-4a7d-8068-0a0341d6bace';

  const formatMessageText = () => {
    const projectLabels: Record<string, { ar: string; en: string }> = {
      'web-app': { ar: 'تطبيق ويب متكامل (Next.js / Full-Stack)', en: 'Full-Stack Web App (Next.js)' },
      'saas': { ar: 'منصة سحابية أو تعليمية (LMS / SaaS)', en: 'SaaS / Educational Platform' },
      'ai-agent': { ar: 'تكامل ذكاء اصطناعي وأتمتة (AI & LLMs)', en: 'AI Integration & Automation' },
      'consulting': { ar: 'استشارة هندسية أو مراجعة كود', en: 'Architecture Consulting / Code Review' },
    };

    const typeLabel = projectLabels[formData.projectType]?.[isAr ? 'ar' : 'en'] || formData.projectType;

    if (isAr) {
      return `مرحباً م. هديل بارود 👋\nلدي طلب استشارة / مشروع جديد عبر بورتفوليو:\n\n• الاسم: ${formData.name}\n• البريد الإلكتروني: ${formData.email}\n• نوع المشروع: ${typeLabel}\n• تفاصيل الرسالة:\n${formData.message}`;
    } else {
      return `Hello Eng. Hadeel Baroud 👋\nI would like to inquire about a project via your portfolio:\n\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Project Type: ${typeLabel}\n• Project Details:\n${formData.message}`;
    }
  };

  const validate = () => {
    setErrors({});
    const validation = ContactFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const openGmailFallback = () => {
    const subject = encodeURIComponent(isAr ? `مشروع جديد: ${formData.projectType} من ${formData.name}` : `New Inquiry: ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(formatMessageText());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.contact.email}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
    const win = window.open(gmailUrl, '_blank');
    if (!win) {
      window.location.href = mailtoUrl;
    }
  };

  // 1. Direct Background Email Submission via Web3Forms (Reaches Hadeel's Inbox directly)
  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
          subject: isAr 
            ? `طلب مشروع جديد: ${formData.projectType} من ${formData.name}`
            : `New Portfolio Inquiry: ${formData.projectType} from ${formData.name}`,
          from_name: `${formData.name} (عبر بورتفوليو هديل بارود)`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setSentVia('api');
      } else {
        // Fallback to Gmail if API returns a non-success response
        setSentVia('email');
        setSubmitSuccess(true);
        openGmailFallback();
      }
    } catch {
      // Network fallback to Gmail
      setSentVia('email');
      setSubmitSuccess(true);
      openGmailFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Direct WhatsApp Dispatch (Instant notification to Hadeel's phone - synchronous for mobile compatibility)
  const handleSendViaWhatsApp = () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(true);
    setSentVia('whatsapp');
    const text = encodeURIComponent(formatMessageText());
    window.location.href = `https://wa.me/${cleanPhone}?text=${text}`;
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      className="py-20 sm:py-28 relative overflow-hidden bg-surface text-navy border-t border-slate-200/80 dark:border-slate-800 scroll-mt-24"
    >
      {/* Soft Ambient Radial Lights (Light & Airy) */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-accent-tint/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-tint border border-accent/20 text-accent text-xs font-semibold font-ibm shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            <span>{dict.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight font-tajawal">
            {dict.contact.title}
          </h2>

          <p className="text-muted text-sm sm:text-base leading-relaxed font-ibm max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Channels Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <ContactSpotlightCard className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-navy font-tajawal">
                  {dict.contact.directContact.title}
                </h3>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 font-ibm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isAr ? 'متاحة للعمل' : 'Available'}</span>
                </span>
              </div>

              <div className="space-y-3 font-ibm">
                {/* Phone (Direct Call on Mobile) & WhatsApp Direct Link */}
                <div className="p-4 rounded-2xl bg-surface border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-accent/40 hover:shadow-xs transition-all">
                  <a
                    href={`tel:${profile.contact.phoneIntl || cleanPhone}`}
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer group"
                    title={isAr ? 'اضغط للاتصال الهاتفي المباشر' : 'Tap to call directly'}
                  >
                    <div className="p-2.5 rounded-xl bg-accent-tint text-accent border border-accent/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted font-medium">{dict.contact.directContact.phone}</div>
                      <div className="text-xs font-bold text-navy font-mono mt-0.5">{profile.contact.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-colors flex items-center gap-1.5 text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                    title="WhatsApp Chat"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Email (Direct Mailto + One-Click Copy) */}
                <div className="p-4 rounded-2xl bg-surface border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-accent/40 hover:shadow-xs transition-all">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer group"
                    title={isAr ? 'إرسال بريد إلكتروني مباشر' : 'Send direct email'}
                  >
                    <div className="p-2.5 rounded-xl bg-accent-tint text-accent border border-accent/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted font-medium">{dict.contact.directContact.email}</div>
                      <div className="text-xs font-bold text-navy font-mono mt-0.5 truncate">{profile.contact.email}</div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(profile.contact.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="p-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-navy transition-colors flex items-center gap-1.5 text-[11px] font-semibold shrink-0 cursor-pointer shadow-2xs"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                    <span>{copiedEmail ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                  </button>
                </div>

                {/* Location / Remote Availability */}
                <div className="p-4 rounded-2xl bg-surface/80 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-accent-tint text-accent border border-accent/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted font-medium">{isAr ? 'العمل عن بُعد:' : 'Remote Collaboration:'}</div>
                    <div className="text-xs font-bold text-navy mt-0.5">
                      {isAr ? 'متاحة للعملاء محلياً وإقليمياً ودولياً' : 'Open to regional & international engagements'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 font-tajawal">
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-surface hover:bg-accent-tint/30 border border-slate-200 dark:border-slate-800 hover:border-accent/30 text-xs font-semibold text-navy flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-navy" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-surface hover:bg-accent-tint/30 border border-slate-200 dark:border-slate-800 hover:border-accent/30 text-xs font-semibold text-navy flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
                  <span>LinkedIn</span>
                </a>
              </div>

            </ContactSpotlightCard>
          </motion.div>

          {/* Clean Light Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <ContactSpotlightCard className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-navy font-tajawal">
                  {isAr ? 'نموذج التواصل السريع وحجز استشارة' : 'Quick Project Inquiry Form'}
                </h3>
                <Sparkles className="w-4 h-4 text-accent" />
              </div>

              {submitSuccess ? (
                <div className="p-7 sm:p-9 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-200 font-tajawal">
                      {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-ibm max-w-md mx-auto leading-relaxed">
                      {sentVia === 'api'
                        ? (isAr
                            ? 'تم إرسال بيانات مشروعك تلقائياً إلى البريد الإلكتروني للمهندسة هديل (baroudhadeel9@gmail.com). ستقوم بمراجعة طلبك والرد عليك في أقرب وقت.'
                            : 'Your inquiry has been delivered directly to Eng. Hadeel’s inbox (baroudhadeel9@gmail.com). She will get back to you shortly.')
                        : sentVia === 'whatsapp'
                        ? (isAr 
                            ? 'تم فتح محادثة واتساب المباشرة مع المهندسة هديل وبها كافة تفاصيل مشروعك. اضغط "إرسال" داخل واتساب لتصلها الرسالة فوراً على هاتفها.' 
                            : 'WhatsApp has been opened with your inquiry pre-filled. Press "Send" to reach Eng. Hadeel instantly.')
                        : (isAr 
                            ? 'تم فتح بريد Gmail في نافذة جديدة بمسودة مكتملة وموجهة إلى baroudhadeel9@gmail.com. اضغط "إرسال" ليصلها إشعار بريدي مباشر.' 
                            : 'Gmail composer has opened with your inquiry pre-filled. Press "Send" to deliver directly to baroudhadeel9@gmail.com.')
                      }
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs font-tajawal"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>{isAr ? 'تواصل أسرع عبر واتساب' : 'Fast-track on WhatsApp'}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({ name: '', email: '', projectType: 'web-app', message: '' });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer shadow-2xs font-ibm"
                    >
                      <span>{isAr ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectSubmit} className="space-y-4 font-ibm">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-navy">
                      {dict.contact.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={dict.contact.form.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-200/90 dark:border-slate-800 text-navy placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs transition-colors shadow-2xs"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-navy">
                      {dict.contact.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={dict.contact.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-200/90 dark:border-slate-800 text-navy placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs transition-colors shadow-2xs"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Type Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-navy">
                      {isAr ? 'نوع المشروع أو نطاق العمل:' : 'Project Type:'}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-200/90 dark:border-slate-800 text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs transition-colors shadow-2xs"
                    >
                      <option value="web-app">{isAr ? 'تطبيق ويب متكامل (Next.js / Full-Stack)' : 'Full-Stack Web App (Next.js)'}</option>
                      <option value="saas">{isAr ? 'منصة سحابية أو تعليمية (LMS / SaaS)' : 'SaaS / Educational Platform'}</option>
                      <option value="ai-agent">{isAr ? 'تكامل ذكاء اصطناعي وأتمتة (AI & LLMs)' : 'AI Integration & Automation'}</option>
                      <option value="consulting">{isAr ? 'استشارة هندسية أو مراجعة كود' : 'Architecture Consulting / Code Review'}</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-navy">
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={dict.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-slate-200/90 dark:border-slate-800 text-navy placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs transition-colors shadow-2xs leading-relaxed"
                    ></textarea>
                    {errors.message && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Primary & WhatsApp Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-accent hover:bg-accent/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 font-tajawal active:scale-[0.98]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {isSubmitting 
                          ? (isAr ? 'جاري إرسال الرسالة إلى بريد هديل...' : 'Delivering Message...') 
                          : (isAr ? 'إرسال الرسالة إلى بريد هديل مباشرة ✉️' : 'Send Message to Email ✉️')}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800" />
                      <span className="text-[10px] text-muted font-ibm">{isAr ? 'أو' : 'or'}</span>
                      <div className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800" />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50 font-tajawal active:scale-[0.98]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>{isAr ? 'تواصل مباشر وفوري عبر واتساب 💬' : 'Direct Instant Chat via WhatsApp 💬'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-muted text-center font-ibm pt-1">
                    {isAr 
                      ? '🔒 تصل رسالتك مباشرة وبأمان إلى البريد الإلكتروني للمهندسة هديل'
                      : '🔒 Your message is delivered securely and directly to Eng. Hadeel’s inbox'}
                  </p>

                </form>
              )}

            </ContactSpotlightCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
