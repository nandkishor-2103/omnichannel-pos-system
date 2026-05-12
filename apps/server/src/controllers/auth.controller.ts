import type { Request, Response } from "express";
import validator from "validator";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import generateOtp from "../utils/generateOtp.js";
import { sendMail } from "../services/mail.service.js";
import { storeOtp, getOtp, deleteOtp } from "../services/redis.service.js";
import generateToken from "../utils/generateToken.js";
import ENV_VAR from "../config/env.js";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, phone, role } = req.body;

  // Validate required fields
  if (!fullName || !email || !password || !phone || !role) {
    throw new ApiError({
      statusCode: 400,
      message: "All fields are required",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid email",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError({
      statusCode: 400,
      message: "User already exists with this email",
    });
  }

  // Create new user
  const user = await User.create({
    fullName,
    email,
    password,
    phone,
    role,
  });

  // Generate and store OTP
  const otp = generateOtp();
  await storeOtp(email, otp);

  // Send verification email
  await sendMail({
    to: email,
    subject: "Verify Your Email",
    html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong> only.</p>
    `,
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Signup successful. OTP sent to email.",
      payload: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
    })
  );
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Validate required fields
  if (!email || !otp) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and OTP are required",
    });
  }

  // Retrieve stored OTP
  const storedOtp = await getOtp(email);
  if (!storedOtp) {
    throw new ApiError({
      statusCode: 400,
      message: "OTP expired",
    });
  }

  // Compare OTPs
  if (storedOtp !== otp) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid OTP",
    });
  }

  // Mark user as verified
  await User.findOneAndUpdate({ email }, { verified: true });

  // Delete OTP from Redis
  await deleteOtp(email);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Email verified successfully",
    })
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }

  if (!user.verified) {
    throw new ApiError({
      statusCode: 400,
      message: "Please verify your email before logging in",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }

  user.lastLogin = new Date();
  await user.save();

  await generateToken(res, user);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Login successful",
      payload: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
    })
  );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("infotactToken", {
    httpOnly: true,
    secure: ENV_VAR.NODE_ENV === "production",
    sameSite: ENV_VAR.NODE_ENV === "production" ? "none" : "strict",
    expires: new Date(0),
  });
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Logout successfully",
    })
  );
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "User profile retrieved successfully",
      payload: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
    })
  );
});
