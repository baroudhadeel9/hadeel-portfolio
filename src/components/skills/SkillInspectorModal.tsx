'use client';

import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import { SkillDetail } from './types';

interface SkillInspectorModalProps {
  skill: SkillDetail | null;
  onClose: () => void;
  isAr: boolean;
}

export const SkillInspectorModal: React.FC<SkillInspectorModalProps> = ({
  skill,
  onClose,
  isAr
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!skill) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-ibm">
                {isAr ? skill.categoryName.ar : skill.categoryName.en}
              </span>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {skill.benchmark}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-tajawal pt-1">
              {skill.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 font-ibm text-xs sm:text-sm">
          
          {/* Role & Objective */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-ibm">
              {isAr ? 'الدور الهندسي في المعمارية:' : 'Architectural Role:'}
            </h4>
            <p className="text-slate-800 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {isAr ? skill.role.ar : skill.role.en}
            </p>
          </div>

          {/* Bullet Points of Rigor */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'معايير الإتقان والتطبيق الفعلي:' : 'Implementation Rigor:'}
            </h4>
            <ul className="space-y-2">
              {(isAr ? skill.bulletPoints.ar : skill.bulletPoints.en).map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code / Configuration Snippet Peek */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isAr ? 'مقتطف الشيفرة / التكوين المعماري' : 'Code / Architectural Blueprint'}</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopyCode(skill.codeSnippet)}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-xs font-medium"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نسخ الكود' : 'Copy Code'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed">
              <pre className="whitespace-pre">
                <code>{skill.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Real World Provenance Footer */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">
                  {isAr ? 'الارتباط العملي الحقيقي:' : 'Live Deployment Proof:'}
                </span>
                <span className="font-bold text-slate-900">
                  {skill.projectLink?.name || (isAr ? skill.application.ar : skill.application.en)}
                </span>
              </div>
            </div>

            {skill.projectLink?.url && (
              <a
                href={skill.projectLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
              >
                <span>{isAr ? 'معاينة المشروع الحي' : 'Visit Live Project'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
