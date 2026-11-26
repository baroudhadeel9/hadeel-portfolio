import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';
import { contactRateLimiter } from '@/lib/rate-limit';

describe('POST /api/contact Route Handler', () => {
  beforeEach(() => {
    contactRateLimiter.reset();
    vi.restoreAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    delete process.env.WEB3FORMS_ACCESS_KEY;
  });

  it('rejects invalid payload with 400 status', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A', // too short
        email: 'invalid-email',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.errors).toBeDefined();
  });

  it('silently traps bot submissions via honeypot and returns 200', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'spammer@bot.com',
        projectType: 'Spam',
        message: 'Spam payload to trap.',
        botField: 'Automated spammer string',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toBe('Message processed successfully');
  });

  it('enforces rate limiting when multiple requests exceed threshold', async () => {
    const makeReq = () =>
      new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '203.0.113.195',
        },
        body: JSON.stringify({
          name: 'Hadeel',
          email: 'valid@example.com',
          projectType: 'General',
          message: 'Valid long message for portfolio contact form.',
        }),
      });

    // Send 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeReq());
      // Expect 500 (since WEB3FORMS_ACCESS_KEY is not set in test environment, but passed rate limit)
      expect(res.status).toBe(500);
    }

    // 6th request must trigger rate limit 429
    const blockedRes = await POST(makeReq());
    expect(blockedRes.status).toBe(429);

    const json = await blockedRes.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Rate limit exceeded');
  });

  it('returns 500 if WEB3FORMS_ACCESS_KEY is missing on server', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '198.51.100.5',
      },
      body: JSON.stringify({
        name: 'Hadeel',
        email: 'test@example.com',
        projectType: 'Web Development',
        message: 'This is a genuine inquiry from a prospective client.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Server email dispatch is misconfigured');
  });
});
