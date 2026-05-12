import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "SERVER_PORT",
  "MONGO_URI",
  "DB_NAME",
  "REDIS_URL",
  "JWT_SECRET",
  "NODE_ENV",
  "CLIENT_URL",
] as const;

// Define a type that enforces all required environment variables
type EnvVarKeys = (typeof requiredEnvVars)[number];

type EnvVars = {
  [K in EnvVarKeys]: string;
};

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const ENV_VARS: EnvVars = {
  SERVER_PORT: process.env.SERVER_PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  DB_NAME: process.env.DB_NAME as string,
  REDIS_URL: process.env.REDIS_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  NODE_ENV: process.env.NODE_ENV as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
};

export default ENV_VARS;
