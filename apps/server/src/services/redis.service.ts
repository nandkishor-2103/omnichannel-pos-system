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
