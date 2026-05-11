import mongoose from "mongoose";
import ENV_VARS from "./env.js";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI, {
      dbName: ENV_VARS.DB_NAME,
    });
    console.log("[MONGODB]🍃 Connected to MongoDB successfully!");
  } catch (error) {
    console.error("[MONGODB] ❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;
