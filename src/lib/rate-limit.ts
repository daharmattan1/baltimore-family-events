import { NextRequest } from "next/server";

export interface RateLimitOptions {
  routeKey: string;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

interface Bucket {
  count: number;
  windowStart: number;
  lastSeen: number;
}

// In-memory limiter for baseline abuse controls.
// Serverless runtimes are ephemeral; move to Redis/Edge KV for strict global guarantees.
const buckets = new Map<string, Bucket>();
const MAX_IDLE_MS = 60 * 60 * 1000;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function cleanupBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastSeen > MAX_IDLE_MS) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  cleanupBuckets(now);

  const clientKey = getClientIp(request);
  const key = `${options.routeKey}:${clientKey}`;
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart >= options.windowMs) {
    buckets.set(key, { count: 1, windowStart: now, lastSeen: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.lastSeen = now;
  if (existing.count >= options.limit) {
    const retryAfterMs = options.windowMs - (now - existing.windowStart);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
