import { z } from 'zod';
import type { ProjectSchema } from '@/lib/schemas';

export type ProjectItem = z.infer<typeof ProjectSchema>;
