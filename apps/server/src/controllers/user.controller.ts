import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { getUserByIdService } from "../services/user.service.js";
import { mapUserToResponseDto } from "../mappers/user.mapper.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * @desc    Get Current Logged In User Profile
 * @route   GET /api/user/profile
 * @access  Private
 */
export const getUserProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user!._id)
      .populate("store", "brand contact status")
      .populate("branch", "name address");

    if (!user) {
      throw new ApiError({
        statusCode: 404,
        message: "User not found",
      });
    }

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "User profile retrieved successfully",
        payload: {
          user: mapUserToResponseDto(user),
        },
      })
    );
  }
);

/**
 * @desc    Get User By ID
 * @route   GET /api/users/:id
 * @access  Private
 */
export const getUserByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserByIdService(id as string);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "User profile retrieved successfully",
      payload: {
        user: mapUserToResponseDto(user),
      },
    })
  );
});
