export interface SkillDetail {
  id: string;
  name: string;
  categoryIdx: number;
  categoryName: { ar: string; en: string };
  level: string;
  levelAr: string;
  percent: number;
  highlight: boolean;
  application: { ar: string; en: string };
  role: { ar: string; en: string };
  runtime: string;
  benchmark: string;
  projectLink?: { name: string; url?: string };
  codeSnippet: string;
  codeLang: string;
  bulletPoints: { ar: string[]; en: string[] };
}
