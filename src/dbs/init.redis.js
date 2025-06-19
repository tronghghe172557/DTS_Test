import { createClient } from "redis";
import dev from "../config/env.config.js";

class RedisConnection {
  constructor() {
    if (RedisConnection.instance) {
      return RedisConnection.instance;
    }

    // Tạo config object cho Redis client
    const redisConfig = {
      socket: {
        host: dev.redis.host,
        port: dev.redis.port,
      },
    };

    if (dev.redis.password) {
      redisConfig.password = dev.redis.password;
    }

    if (dev.redis.username) {
      redisConfig.username = dev.redis.username;
    }

    this.client = createClient(redisConfig);

    this.client.on("error", (err) => console.error("Redis error:", err));

    RedisConnection.instance = this;
  }

  static getInstance() {
    if (!RedisConnection.instance) {
      new RedisConnection();
    }
    return RedisConnection.instance;
  }

  async connect() {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
        console.log("Redis connected successfully!");
      } catch (err) {
        console.error("Redis connection failed:", err);
        throw err;
      }
    }
  }

  getClient() {
    return this.client;
  }
}

export default RedisConnection.getInstance();
