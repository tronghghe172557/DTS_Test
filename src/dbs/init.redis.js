// Thay đổi import
import Redis from "ioredis";
import dev from "../config/env.config.js";

class RedisConnection {
  constructor() {
    const redisOptions = {
      host: dev.redis.host,
      port: dev.redis.port,
      username: dev.redis.username,
      password: dev.redis.password,
      maxRetriesPerRequest: null,
      // enableReadyCheck: false, // Bỏ comment dòng này nếu bạn gặp lỗi READYONLY
    };

    this.client = new Redis(redisOptions);

    // Các listener của ioredis, tên gọi tương tự như node-redis
    this.client.on("connect", () =>
      console.log("Redis client connected to the server.")
    );
    this.client.on("ready", () =>
      console.log("Redis server is ready to accept commands.")
    );
    this.client.on("error", (err) => console.error("Redis Client Error:", err));
    this.client.on("reconnecting", () =>
      console.warn("!!! Redis client is reconnecting...")
    );
    this.client.on("end", () =>
      console.log("Connection to Redis has been closed.")
    );
  }

  async disconnect() {
    if (this.client.status === "ready" || this.client.status === "connecting") {
      await this.client.quit();
    }
  }

  getClient() {
    return this.client;
  }
}

const instance = new RedisConnection();

export default instance;
