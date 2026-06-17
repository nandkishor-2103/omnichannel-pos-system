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
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD",
  "SUPER_ADMIN_PHONE",
  "VERIFIED",
  "FULL_NAME",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "BREVO_SMTP_USER",
  "BREVO_SMTP_PASS",
  "EMAIL_FROM",
] as const;

// Define a type that enforces all required environment variables
type RequiredEnvVarKeys = (typeof requiredEnvVars)[number];
// type OptionalEnvVarKeys = (typeof optionalEnvVars)[number];

type EnvVars = {
  [K in RequiredEnvVarKeys]: string;
}; /* & {
  [K in OptionalEnvVarKeys]?: string; //? = optional
}; */

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
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE as string,
  VERIFIED: process.env.VERIFIED as string,
  FULL_NAME: process.env.FULL_NAME as string,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID as string,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET as string,
  BREVO_SMTP_USER: process.env.BREVO_SMTP_USER as string,
  BREVO_SMTP_PASS: process.env.BREVO_SMTP_PASS as string,
  EMAIL_FROM: process.env.EMAIL_FROM as string,
};

export default ENV_VARS;
