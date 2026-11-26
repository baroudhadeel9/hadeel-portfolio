import { z } from 'zod';
import type enDict from '../../data/locales/en.json';

// Dictionary & Locale Types
export type Dictionary = typeof enDict;

// Environment Schema
export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  WEB3FORMS_ACCESS_KEY: z.string().optional(),
});
export type Env = z.infer<typeof EnvSchema>;

// Contact Form Schema
export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صالح' }),
  projectType: z.string().min(1, { message: 'يرجى اختيار نوع المشروع' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن لا تقل عن 10 أحرف' }),
  botField: z.string().max(0, { message: 'Bot detected' }).optional(), // Honeypot field
});
export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Certificate Schema
export const CertificateSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleAr: z.string(),
  issuer: z.string(),
  category: z.string(),
  categoryLabel: z.object({ ar: z.string(), en: z.string() }),
  image: z.string(),
  verificationType: z.string(),
  verificationCode: z.string().nullable().optional(),
  hours: z.string().optional(),
  hoursAr: z.string().optional(),
  date: z.string().optional(),
  highlight: z.boolean(),
  description: z.object({ ar: z.string(), en: z.string() }),
});
export type CertificateItem = z.infer<typeof CertificateSchema>;

// Project Schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleAr: z.string(),
  tagline: z.object({ ar: z.string(), en: z.string() }),
  category: z.string(),
  categoryAr: z.string(),
  featured: z.boolean(),
  image: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  tech: z.array(z.string()),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label: z.object({ ar: z.string(), en: z.string() }),
      })
    )
    .optional(),
  challenges: z.object({ ar: z.string(), en: z.string() }),
  features: z.array(
    z.object({
      title: z.object({ ar: z.string(), en: z.string() }),
      desc: z.object({ ar: z.string(), en: z.string() }),
    })
  ),
});
export type ProjectItem = z.infer<typeof ProjectSchema>;

// Profile Schema
export const ProfileSchema = z.object({
  name: z.object({ ar: z.string(), en: z.string() }),
  title: z.object({ ar: z.string(), en: z.string() }),
  subtitle: z.object({ ar: z.string(), en: z.string() }),
  education: z.object({
    degree: z.object({ ar: z.string(), en: z.string() }),
    university: z.object({ ar: z.string(), en: z.string() }),
  }),
  contact: z.object({
    phone: z.string(),
    phoneIntl: z.string(),
    email: z.string().email(),
    location: z.object({ ar: z.string(), en: z.string() }),
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
  stats: z.array(
    z.object({
      value: z.object({ ar: z.string(), en: z.string() }),
      label: z.object({ ar: z.string(), en: z.string() }),
    })
  ),
});
export type ProfileData = z.infer<typeof ProfileSchema>;

// Skills Data Schema
export const SkillItemSchema = z.object({
  name: z.string(),
  level: z.string(),
  levelAr: z.string(),
  percent: z.number(),
  highlight: z.boolean().optional(),
  application: z.object({ ar: z.string(), en: z.string() }),
});

export const SkillCategorySchema = z.object({
  category: z.object({ ar: z.string(), en: z.string() }),
  skills: z.array(SkillItemSchema),
});

export const SkillsDataSchema = z.array(SkillCategorySchema);
export type SkillsData = z.infer<typeof SkillsDataSchema>;
