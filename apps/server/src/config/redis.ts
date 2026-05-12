import { createClient } from "redis";
import ENV_VARS from "./env.js";

const redisClient = createClient({
  url: ENV_VARS.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("[REDIS] 🚀 Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.error("[REDIS] ❌ Redis connection error:", err);
  process.exit(1);
});

export default redisClient;
