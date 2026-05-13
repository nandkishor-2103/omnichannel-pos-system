import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function getUserByIdService(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return user;
}
