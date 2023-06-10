import { redisClient } from "../../config/redis";
import { RedisRepository } from "./redis-repository";

export class Redis implements RedisRepository {
  async get(key: string): Promise<string | null> {
    return await redisClient.get(key);
  }
  async set(key: string, value: string): Promise<void> {
    await redisClient.set(key, value);
  }
  async del(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
