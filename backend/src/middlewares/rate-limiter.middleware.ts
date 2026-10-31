import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { env } from "../config/env.config";
import { redisClient } from "../config/redis.config";
import { ApiResponse } from "../utils/response.util";

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  ...(redisClient && {
    store: new RedisStore({
      sendCommand: (...args: string[]) => (redisClient!.call as any)(...args),
    })
  }),
  message: ApiResponse.error(
    "Too many requests from this IP, please try again later."
  ),
});

// Stricter rate-limiter for sensitive authentication & OTP endpoints (5 requests per 15 minutes)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  ...(redisClient && {
    store: new RedisStore({
      prefix: "rl:auth:",
      sendCommand: (...args: string[]) => (redisClient!.call as any)(...args),
    })
  }),
  message: ApiResponse.error(
    "Too many authentication attempts. Please wait 15 minutes before retrying."
  ),
});

// Rate limiter for product listing creation to prevent marketplace spam/floods (20 posts per hour)
export const createListingRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  ...(redisClient && {
    store: new RedisStore({
      prefix: "rl:listings:",
      sendCommand: (...args: string[]) => (redisClient!.call as any)(...args),
    })
  }),
  message: ApiResponse.error(
    "Listing creation limit reached for this hour. Please try again later."
  ),
});
