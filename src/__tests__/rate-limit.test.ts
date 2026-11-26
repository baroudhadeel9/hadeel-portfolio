import { describe, it, expect, beforeEach } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';

describe('Rate Limiter', () => {
  let limiter: ReturnType<typeof createRateLimiter>;

  beforeEach(() => {
    limiter = createRateLimiter({
      windowMs: 1000, // 1 second window for fast tests
      maxRequests: 3,
    });
  });

  it('allows requests up to the max limit', () => {
    const ip = '192.168.1.1';
    expect(limiter.check(ip)).toBe(true); // 1
    expect(limiter.check(ip)).toBe(true); // 2
    expect(limiter.check(ip)).toBe(true); // 3
    expect(limiter.check(ip)).toBe(false); // 4 -> Rate limited
  });

  it('tracks remaining requests correctly', () => {
    const ip = '10.0.0.1';
    expect(limiter.getRemaining(ip)).toBe(3);
    limiter.check(ip);
    expect(limiter.getRemaining(ip)).toBe(2);
    limiter.check(ip);
    expect(limiter.getRemaining(ip)).toBe(1);
    limiter.check(ip);
    expect(limiter.getRemaining(ip)).toBe(0);
    limiter.check(ip);
    expect(limiter.getRemaining(ip)).toBe(0);
  });

  it('maintains independent quotas for different IP addresses', () => {
    const ip1 = '1.1.1.1';
    const ip2 = '2.2.2.2';

    // Exhaust ip1
    limiter.check(ip1);
    limiter.check(ip1);
    limiter.check(ip1);
    expect(limiter.check(ip1)).toBe(false);

    // ip2 should still have full quota
    expect(limiter.check(ip2)).toBe(true);
    expect(limiter.getRemaining(ip2)).toBe(2);
  });

  it('resets all limits when reset() is invoked', () => {
    const ip = '172.16.0.1';
    limiter.check(ip);
    limiter.check(ip);
    limiter.check(ip);
    expect(limiter.check(ip)).toBe(false);

    limiter.reset();
    expect(limiter.getRemaining(ip)).toBe(3);
    expect(limiter.check(ip)).toBe(true);
  });
});
