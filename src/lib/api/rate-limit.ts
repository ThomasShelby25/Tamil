// Simple in-memory rate limiter (for development)
// For production, use Redis or similar

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour

export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count < MAX_REQUESTS) {
    entry.count++;
    return true;
  }

  return false;
};

export const getRateLimitInfo = (identifier: string) => {
  const entry = rateLimitMap.get(identifier);
  if (!entry) return { remaining: MAX_REQUESTS, resetTime: null };
  
  const now = Date.now();
  const remaining = entry.count < MAX_REQUESTS ? MAX_REQUESTS - entry.count : 0;
  const resetTime = entry.resetTime > now ? new Date(entry.resetTime) : null;

  return { remaining, resetTime };
};
