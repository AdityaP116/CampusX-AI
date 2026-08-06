import Redis from "ioredis";
import { env } from "./env.config";

export const redisClient = env.REDIS_URL ? new Redis(env.REDIS_URL) : undefined;
