import { z } from 'zod';
import type { SkillsDataSchema } from '@/lib/schemas';

export type SkillsData = z.infer<typeof SkillsDataSchema>;

export interface SkillDetail {
  id: string;
  name: string;
  category: { ar: string; en: string };
  categoryIdx: number;
  level: string;
  levelAr: string;
  percent: number;
  highlight?: boolean;
  application: { ar: string; en: string };
}
