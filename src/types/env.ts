import { z } from 'zod';
import type { EnvSchema } from '@/lib/schemas';

export type Env = z.infer<typeof EnvSchema>;
