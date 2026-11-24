import { z } from 'zod';
import type { ProfileSchema } from '@/lib/schemas';

export type ProfileData = z.infer<typeof ProfileSchema>;
