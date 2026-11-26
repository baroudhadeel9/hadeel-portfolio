export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimiter {
  check: (ip: string) => boolean;
  reset: () => void;
  getRemaining: (ip: string) => number;
}

/**
 * In-memory sliding-window rate limiter for serverless endpoints.
 * Best-effort protection on single-instance lifecycles.
 */
export function createRateLimiter(options: RateLimitOptions): RateLimiter {
  const { windowMs, maxRequests } = options;
  const store = new Map<string, { count: number; resetAt: number }>();

  return {
    check(ip: string): boolean {
      const now = Date.now();
      const entry = store.get(ip);

      if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
      }

      if (entry.count >= maxRequests) {
        return false;
      }

      entry.count += 1;
      return true;
    },

    getRemaining(ip: string): number {
      const now = Date.now();
      const entry = store.get(ip);
      if (!entry || now > entry.resetAt) {
        return maxRequests;
      }
      return Math.max(0, maxRequests - entry.count);
    },

    reset(): void {
      store.clear();
    },
  };
}

// 15-minute window with 5 submissions per IP
export const contactRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
});
