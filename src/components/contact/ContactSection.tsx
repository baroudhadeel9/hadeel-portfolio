'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/SocialIcons';
import { ContactFormSchema, ContactFormData, Dictionary, ProfileData } from '@/lib/schemas';
import { ContactInfoCard } from './ContactInfoCard';

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
    botField: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [sentVia, setSentVia] = useState<'api' | 'whatsapp' | 'email' | null>(null);

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

  // 1. Direct Background Email Submission via Secure Next.js Server API
  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-submit
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s network timeout

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setSentVia('api');
      } else {
        if (response.status === 429) {
          setApiError(
            isAr
              ? 'تم تجاوز الحد الأقصى للمحاولات. يرجى الانتظار 15 دقيقة قبل المحاولة مجدداً.'
              : 'Rate limit exceeded. Please wait 15 minutes before trying again.'
          );
        } else if (result.error) {
          setApiError(
            typeof result.error === 'string'
              ? result.error
              : (isAr ? 'تعذر إرسال النموذج. يمكنك استخدام واتساب أو البريد المباشر.' : 'Submission failed. You can use WhatsApp or Email.')
          );
        } else {
          // Fallback to Gmail if API returns unhandled non-success
          setSentVia('email');
          setSubmitSuccess(true);
          openGmailFallback();
        }
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setApiError(
          isAr
            ? 'انتهت مهلة الاتصال بالخادم (Timeout). يرجى التحقق من اتصال الإنترنت أو استخدام واتساب.'
            : 'Request timed out. Please check your network or reach out via WhatsApp.'
        );
      } else {
        // Network fallback to Gmail
        setSentVia('email');
        setSubmitSuccess(true);
        openGmailFallback();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Direct WhatsApp Dispatch (Instant notification to Hadeel's phone - synchronous for mobile compatibility)
  const handleSendViaWhatsApp = () => {
    if (isSubmitting) return;
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
      className="py-20 sm:py-28 relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 scroll-mt-24"
    >
      {/* Soft Ambient Radial Lights (Light & Airy) */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold font-ibm shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span>{dict.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-tajawal">
            {dict.contact.title}
          </h2>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-ibm max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Channels Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <ContactInfoCard profile={profile} dict={dict} isAr={isAr} />
          </motion.div>

          {/* Clean Light Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <ContactSpotlightCard className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/70 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <h3 className="text-base font-bold text-slate-900 font-tajawal">
                  {dict.contact.quickFormTitle}
                </h3>
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </div>

              {submitSuccess ? (
                <div className="p-7 sm:p-9 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-emerald-950 font-tajawal">
                      {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 font-ibm max-w-md mx-auto leading-relaxed">
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
                      rel="noopener noreferrer"
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-900 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs font-ibm"
                    >
                      <span>{isAr ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectSubmit} className="space-y-4 font-ibm">
                  {/* Invisible Honeypot Spam Protection Field for Bots */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="botField">Do not fill this field</label>
                    <input
                      type="text"
                      id="botField"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botField || ''}
                      onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    />
                  </div>
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700">
                      {dict.contact.form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={dict.contact.form.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 text-xs transition-colors shadow-2xs"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700">
                      {dict.contact.form.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={dict.contact.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 text-xs transition-colors shadow-2xs"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Type Select */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-project-type" className="text-xs font-semibold text-slate-700">
                      {isAr ? 'نوع المشروع أو نطاق العمل:' : 'Project Type:'}
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 text-xs transition-colors shadow-2xs"
                    >
                      <option value="web-app">{isAr ? 'تطبيق ويب متكامل (Next.js / Full-Stack)' : 'Full-Stack Web App (Next.js)'}</option>
                      <option value="saas">{isAr ? 'منصة سحابية أو تعليمية (LMS / SaaS)' : 'SaaS / Educational Platform'}</option>
                      <option value="ai-agent">{isAr ? 'تكامل ذكاء اصطناعي وأتمتة (AI & LLMs)' : 'AI Integration & Automation'}</option>
                      <option value="consulting">{isAr ? 'استشارة هندسية أو مراجعة كود' : 'Architecture Consulting / Code Review'}</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700">
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      required
                      aria-required="true"
                      aria-invalid={errors.message ? 'true' : 'false'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={dict.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 text-xs transition-colors shadow-2xs leading-relaxed"
                    ></textarea>
                    {errors.message && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* API Error Feedback Banner */}
                  {apiError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      <div className="flex-1 font-ibm leading-relaxed">{apiError}</div>
                    </div>
                  )}

                  {/* Primary & WhatsApp Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 font-tajawal active:scale-[0.98]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {isSubmitting 
                          ? dict.contact.delivering 
                          : dict.contact.sendToEmail}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-slate-200/80" />
                      <span className="text-[10px] text-slate-500 font-ibm">{dict.contact.or}</span>
                      <div className="flex-1 h-px bg-slate-200/80" />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50 font-tajawal active:scale-[0.98]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>{dict.contact.directWhatsApp}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center font-ibm pt-1">
                    {dict.contact.secureNote}
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
