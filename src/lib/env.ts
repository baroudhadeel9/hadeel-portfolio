import { EnvSchema, type Env } from './schemas';

export function validateEnv(): Env {
  const envData = {
    NODE_ENV: process.env.NODE_ENV,
    WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY,
  };

  const parsed = EnvSchema.safeParse(envData);
  if (!parsed.success) {
    console.error('Environment validation failure:', parsed.error.format());
    throw new Error('Invalid environment configuration');
  }

  return parsed.data;
}

export const env = validateEnv();
