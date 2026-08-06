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
