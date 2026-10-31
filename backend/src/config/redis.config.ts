import Redis from "ioredis";
import { env } from "./env.config";
import { logger } from "../utils/logger";

export const redisClient = env.REDIS_URL
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
      lazyConnect: true,
    })
  : undefined;

if (redisClient) {
  redisClient.connect().catch((err) => {
    logger.warn(`Redis initial connection failed: ${err.message}. Operating without Redis cache.`);
  });

  redisClient.on("error", (err) => {
    logger.error(`Redis error: ${err.message}`);
  });
}
