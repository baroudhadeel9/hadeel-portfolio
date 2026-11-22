import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صالح' }),
  projectType: z.string().min(1, { message: 'يرجى اختيار نوع المشروع' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن لا تقل عن 10 أحرف' }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

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
  description: z.object({ ar: z.string(), en: z.string() })
});

export type CertificateItem = z.infer<typeof CertificateSchema>;

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
  metrics: z.array(z.object({
    value: z.string(),
    label: z.object({ ar: z.string(), en: z.string() })
  })).optional(),
  challenges: z.object({ ar: z.string(), en: z.string() }),
  features: z.array(z.object({
    title: z.object({ ar: z.string(), en: z.string() }),
    desc: z.object({ ar: z.string(), en: z.string() })
  }))
});

export type ProjectItem = z.infer<typeof ProjectSchema>;
