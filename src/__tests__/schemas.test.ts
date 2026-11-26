import { describe, it, expect } from 'vitest';
import { ContactFormSchema, ProjectSchema, CertificateSchema, EnvSchema } from '@/lib/schemas';
import projectsData from '../../data/projects.json';
import certsData from '../../data/certificates.json';

describe('Validation Schemas', () => {
  describe('ContactFormSchema', () => {
    it('accepts valid contact form submissions', () => {
      const validData = {
        name: 'هديل بارود',
        email: 'hadeel@example.com',
        projectType: 'Web Development',
        message: 'مرحباً، أود مناقشة مشروع تطوير جديد.',
      };
      const result = ContactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects names shorter than 2 characters', () => {
      const invalidData = {
        name: 'A',
        email: 'test@example.com',
        projectType: 'General',
        message: 'رسالة تجريبية أطول من عشرة أحرف',
      };
      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toBeDefined();
      }
    });

    it('rejects invalid email addresses', () => {
      const invalidData = {
        name: 'Hadeel',
        email: 'not-an-email',
        projectType: 'General',
        message: 'Valid long enough message text.',
      };
      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined();
      }
    });

    it('rejects messages shorter than 10 characters', () => {
      const invalidData = {
        name: 'Hadeel',
        email: 'test@example.com',
        projectType: 'General',
        message: 'Short',
      };
      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.message).toBeDefined();
      }
    });

    it('detects and rejects honeypot bot submissions', () => {
      const botData = {
        name: 'Bot Spammer',
        email: 'spam@bot.com',
        projectType: 'Spam',
        message: 'A spam message targeting the form.',
        botField: 'I am a malicious automated bot',
      };
      const result = ContactFormSchema.safeParse(botData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.botField).toBeDefined();
      }
    });
  });

  describe('ProjectSchema', () => {
    it('successfully validates all items in projects.json', () => {
      expect(Array.isArray(projectsData)).toBe(true);
      expect(projectsData.length).toBeGreaterThan(0);

      for (const project of projectsData) {
        const result = ProjectSchema.safeParse(project);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('CertificateSchema', () => {
    it('successfully validates all items in certificates.json', () => {
      expect(Array.isArray(certsData)).toBe(true);
      expect(certsData.length).toBeGreaterThan(0);

      for (const cert of certsData) {
        const result = CertificateSchema.safeParse(cert);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('EnvSchema', () => {
    it('accepts standard NODE_ENV values', () => {
      expect(EnvSchema.safeParse({ NODE_ENV: 'development' }).success).toBe(true);
      expect(EnvSchema.safeParse({ NODE_ENV: 'production' }).success).toBe(true);
      expect(EnvSchema.safeParse({ NODE_ENV: 'test' }).success).toBe(true);
    });

    it('rejects invalid NODE_ENV values', () => {
      expect(EnvSchema.safeParse({ NODE_ENV: 'staging' }).success).toBe(false);
    });
  });
});
