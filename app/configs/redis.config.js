const Redis = require("ioredis");
const config = require("../configs/env.config");

const redis = new Redis(config.redis.uri);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

redis.on("reconnecting", (delay, attempt) => {
  console.log(`Attempting to reconnect to Redis in ${delay}ms (attempt ${attempt})`);
});

module.exports = redis;
