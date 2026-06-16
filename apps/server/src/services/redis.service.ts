import redisClient from "../config/redis.js";

export const storeOtp = async (email: string, otp: string) => {
  await redisClient.set(`otp:${email}`, otp, {
    EX: 300, // Expire in 5 minutes
  });
};

export const getOtp = async (email: string) => {
  return redisClient.get(`otp:${email}`);
};

export const deleteOtp = async (email: string) => {
  return redisClient.del(`otp:${email}`);
};

export const markForgotPasswordVerified = async (email: string) => {
  await redisClient.set(`forgot_verified:${email}`, "true", {
    EX: 300, // 5 minutes
  });
};

export const isForgotPasswordVerified = async (email: string): Promise<boolean> => {
  const value = await redisClient.get(`forgot_verified:${email}`);

  return value === "true";
};

export const removeForgotPasswordVerified = async (email: string) => {
  await redisClient.del(`forgot_verified:${email}`);
};
