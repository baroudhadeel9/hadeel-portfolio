import { z } from 'zod';
import type { CertificateSchema } from '@/lib/schemas';

export type CertificateItem = z.infer<typeof CertificateSchema>;

export type CertificateCategoryKey =
  | 'all'
  | 'ai'
  | 'architecture'
  | 'foundations'
  | 'web'
  | 'javascript'
  | 'python';

export interface CertificateFilterTab {
  key: string;
  label: string;
}
