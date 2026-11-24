'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Bot, 
  Layout, 
  Server, 
  Sparkles, 
  Workflow,
  Code2,
  Award,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SkillDetail } from './types';
import { skillDetailsMap } from './skillDetailsData';
import { BentoSpotlightCard } from './BentoSpotlightCard';
import { SkillInspectorModal } from './SkillInspectorModal';
import { Dictionary, SkillsData } from '@/lib/schemas';

interface SkillsSectionProps {
  lang: 'ar' | 'en';
  dict: Dictionary;
  skillsData: SkillsData;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang, dict, skillsData }) => {
  const isAr = lang === 'ar';
  const [inspectingSkill, setInspectingSkill] = useState<SkillDetail | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectingSkill(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Category Configuration with integrated Architecture Missions
  const categoryMeta: Record<number, {
    nameAr: string;
    nameEn: string;
    missionAr: string;
    missionEn: string;
    icon: React.ReactNode;
    badgeBg: string;
    border: string;
    accent: string;
  }> = {
    0: {
      nameAr: 'الذكاء الاصطناعي وهندسة الوكلاء',
      nameEn: 'AI & Agentic Engineering',
      missionAr: 'استدعاء دوال مهيكلة (Tool Calling) والربط مع النماذج التوليدية',
      missionEn: 'Structured agentic tool use & client/server LLM pipelines',
      icon: <Bot className="w-5 h-5 text-indigo-600" />,
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      border: 'border-indigo-100 hover:border-indigo-300',
      accent: 'from-indigo-600 to-violet-600'
    },
    1: {
      nameAr: 'تطوير الواجهات وتجربة المستخدم',
      nameEn: 'Modern Frontend & UX',
      missionAr: 'تصيير فوري خفيف (180ms TTFB) مع دعم أصيل لـ RTL والـ Dark/Light',
      missionEn: 'React Server Components, Partial Pre-rendering & dynamic i18n',
      icon: <Layout className="w-5 h-5 text-sky-600" />,
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
      border: 'border-sky-100 hover:border-sky-300',
      accent: 'from-sky-600 to-blue-600'
    },
    2: {
      nameAr: 'الباك إند وقواعد البيانات السحابية',
      nameEn: 'Backend & Cloud Databases',
      missionAr: 'قفل تشاؤمي لمنع تضارب الحجوزات مع حماية الصفوف RLS (أيرلندا)',
      missionEn: 'Concurrency-safe pessimistic locking & Row Level Security',
      icon: <Server className="w-5 h-5 text-emerald-600" />,
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      border: 'border-emerald-100 hover:border-emerald-300',
      accent: 'from-emerald-600 to-teal-600'
    },
    3: {
      nameAr: 'معمارية النظم وهندسة البرمجيات',
      nameEn: 'Systems & Clean Architecture',
      missionAr: 'فصل صارم بين الطبقات ومبادئ SOLID ومعمارية قابلة للتوسع',
      missionEn: 'High cohesion, loose coupling, and audited CodeMap engineering',
      icon: <Cpu className="w-5 h-5 text-amber-600" />,
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      border: 'border-amber-100 hover:border-amber-300',
      accent: 'from-amber-600 to-orange-600'
    }
  };

  // Compile full skill items list
  const allSkills: SkillDetail[] = useMemo(() => {
    const list: SkillDetail[] = [];
    skillsData.forEach((categoryGroup, catIdx) => {
      categoryGroup.skills.forEach((skill) => {
        const spec = skillDetailsMap[skill.name] || {};
        list.push({
          id: spec.id || skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: skill.name,
          categoryIdx: catIdx,
          categoryName: categoryGroup.category,
          level: skill.level || 'Advanced',
          levelAr: skill.levelAr || 'متقدم',
          percent: skill.percent || 90,
          highlight: skill.highlight ?? true,
          application: skill.application || {
            ar: 'مطبق في المشاريع والأنظمة الحية',
            en: 'Applied in active production systems'
          },
          role: spec.role || {
            ar: 'مكون أساسي داخل معمارية النظام لضمان الموثوقية والأداء.',
            en: 'Core building block delivering speed and resilience.'
          },
          runtime: spec.runtime || 'Production Standard Runtime',
          benchmark: spec.benchmark || 'High Performance Certified',
          projectLink: spec.projectLink,
          codeSnippet: spec.codeSnippet || `// ${skill.name} Implementation Spec\nexport const config = { enabled: true, version: 'production' };`,
          codeLang: spec.codeLang || 'typescript',
          bulletPoints: spec.bulletPoints || {
            ar: [
              'مطبق وفق أعلى المعايير الهندسية الحديثة',
              'خاضع للاختبار والمراجعة البرمجية الدقيقة',
              'مرتبط بمشاريع حية معتمدة'
            ],
            en: [
              'Implemented following modern engineering standards',
              'Subjected to strict regression testing and code reviews',
              'Deployed across audited live systems'
            ]
          }
        });
      });
    });
    return list;
  }, [skillsData]);

  // Group skills by category index
  const skillsByCategory = useMemo(() => {
    const grouped: Record<number, SkillDetail[]> = { 0: [], 1: [], 2: [], 3: [] };
    allSkills.forEach(skill => {
      if (grouped[skill.categoryIdx]) {
        grouped[skill.categoryIdx].push(skill);
      }
    });
    return grouped;
  }, [allSkills]);

  return (
    <section 
      id="skills" 
      className="py-16 sm:py-20 relative overflow-hidden bg-[#f8fafc] text-slate-900 selection:bg-indigo-600 selection:text-white scroll-mt-24"
    >
      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 -z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 35%, #000 60%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Compact Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 text-indigo-700 text-xs font-semibold shadow-2xs font-ibm">
            <Workflow className="w-3.5 h-3.5 text-indigo-600" />
            <span>{dict.skills.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-tajawal">
            {dict.skills.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-ibm max-w-xl mx-auto">
            {isAr
              ? 'معمارية متكاملة تربط واجهات الـ Next.js بالذكاء الاصطناعي وخوادم Laravel وقواعد بيانات Supabase في بيئة إنتاجية حقيقية.'
              : 'End-to-end full-stack architecture linking Next.js clients, AI agents, Laravel APIs, and Supabase cloud DB.'}
          </p>

          {/* Compact 1-line Credibility Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 font-ibm text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
              <Zap className="w-3 h-3 text-indigo-600" />
              <strong className="text-slate-900">18+</strong>
              <span>{isAr ? 'تقنية معتمدة' : 'Verified Tools'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <strong className="text-slate-900">100%</strong>
              <span>{isAr ? 'مشاريع حية: EduHub & Coach Space' : 'Live: EduHub & Coach Space'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
              <Award className="w-3 h-3 text-amber-600" />
              <strong className="text-slate-900">320+</strong>
              <span>{isAr ? 'ساعة تدريب هندسي موثق' : 'Accredited Hours'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
              <Cpu className="w-3 h-3 text-sky-600" />
              <strong className="text-slate-900">{isAr ? 'هندسة حاسوب' : 'Computer Eng.'}</strong>
              <span className="text-slate-500">{isAr ? 'جامعة الأزهر' : 'Al-Azhar'}</span>
            </span>
          </div>
        </motion.div>

        {/* 4-Domain Bento Matrix (2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {Object.entries(categoryMeta).map(([idxStr, meta]) => {
            const idx = parseInt(idxStr, 10);
            const domainSkills = skillsByCategory[idx] || [];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="h-full"
              >
                <BentoSpotlightCard className="h-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
                  {/* Domain Header with Architectural Mission Tag */}
                  <div className="space-y-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${meta.badgeBg}`}>
                          {meta.icon}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-tajawal">
                            {isAr ? meta.nameAr : meta.nameEn}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                        {domainSkills.length} {isAr ? 'مهارات' : 'Skills'}
                      </span>
                    </div>

                    {/* Architecture Mission Statement */}
                    <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50/60 px-3 py-1.5 rounded-xl border border-indigo-100 font-ibm">
                      <Workflow className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
                      <span className="truncate font-medium">
                        {isAr ? meta.missionAr : meta.missionEn}
                      </span>
                    </div>
                  </div>

                  {/* Compact Skills List Inside Domain Card */}
                  <div className="divide-y divide-slate-100 mt-2 font-ibm flex-1">
                    {domainSkills.map((skill) => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setInspectingSkill(skill)}
                        className="w-full py-2.5 px-2 -mx-2 rounded-xl hover:bg-slate-50 text-start flex items-center justify-between gap-3 group transition-all cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-md shrink-0">
                              {isAr ? skill.levelAr : skill.level}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span className="truncate">{isAr ? skill.application.ar : skill.application.en}</span>
                          </div>
                        </div>

                        {/* Right Indicator: Percent + Inspector Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-700">{skill.percent}%</span>
                          <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                            <Code2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Domain Card Footer Note */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-ibm">
                    <span>{isAr ? 'انقري على أي مهارة لعرض الكود والربط الحي' : 'Click any skill to inspect code & proof'}</span>
                    <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-1">
                      <span>{isAr ? 'فحص كامل' : 'Inspect'}</span>
                      <ChevronRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                    </span>
                  </div>

                </BentoSpotlightCard>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Modular Skill Inspector Modal */}
      <SkillInspectorModal 
        skill={inspectingSkill} 
        onClose={() => setInspectingSkill(null)} 
        isAr={isAr} 
      />

    </section>
  );
};
