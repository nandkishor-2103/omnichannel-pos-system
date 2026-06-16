import type { Request, Response } from "express";
import validator from "validator";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import generateOtp from "../utils/generateOtp.js";
import { sendMail } from "../services/mail.service.js";
import {
  storeOtp,
  getOtp,
  deleteOtp,
  markForgotPasswordVerified,
  isForgotPasswordVerified,
  removeForgotPasswordVerified,
} from "../services/redis.service.js";
import generateToken from "../utils/generateToken.js";
import ENV_VAR from "../config/env.js";
import { mapUserToResponseDto } from "../mappers/user.mapper.js";

/**
 * @desc    Signup a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  console.log("SIGNUP CONTROLLER HIT");
  const { fullName, email, password, phone, role } = req.body;

  if (role === "ROLE_ADMIN") {
    throw new ApiError({
      statusCode: 403,
      message: "Super Admin cannot be created",
    });
  }

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
  console.log("OTP Generated:", otp);
  await storeOtp(email, otp);

  console.log("OTP Stored");

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

  console.log("Email Sent Successfully");

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

/**
 * @desc    Verify OTP for email verification
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
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

// ============================== FORGOT PASSWORD ==============================
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError({
      statusCode: 400,
      message: "Email is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  const otp = generateOtp();

  await storeOtp(`forgot:${email}`, otp);

  await sendMail({
    to: email,
    subject: "Reset Password OTP",
    html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
  });

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "OTP sent successfully",
    })
  );
});

// ============================== VERIFY RESET OTP ==============================
export const verifyResetOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and OTP are required",
    });
  }

  const storedOtp = await getOtp(`forgot:${email}`);

  if (!storedOtp) {
    throw new ApiError({
      statusCode: 400,
      message: "OTP expired",
    });
  }

  if (storedOtp !== otp) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid OTP",
    });
  }

  await markForgotPasswordVerified(email);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "OTP verified successfully",
    })
  );
});

// ============================ RESET PASSWORD ==============================
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  const verified = await isForgotPasswordVerified(email);

  if (!verified) {
    throw new ApiError({
      statusCode: 403,
      message: "OTP verification required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found",
    });
  }

  user.password = password;

  await user.save();

  await Promise.all([deleteOtp(`forgot:${email}`), removeForgotPasswordVerified(email)]);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Password reset successfully",
    })
  );
});

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate("store", "brand contact status")
    .populate("branch", "name address");

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

  if (user.role !== "ROLE_ADMIN" && user.role !== "ROLE_STORE_ADMIN") {
    const store = user.store as {
      status?: string;
    };

    if (store?.status !== "ACTIVE") {
      const messages = {
        PENDING: "Your store is awaiting approval from Super Admin.",
        BLOCKED: "Your store has been blocked. Contact support.",
        INACTIVE: "Your store has been deactivated.",
      };

      throw new ApiError({
        statusCode: 403,
        message:
          messages[store?.status as keyof typeof messages] ?? "Store access denied.",
      });
    }
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
        user: mapUserToResponseDto(user),
      },
    })
  );
});

/**
 * @desc    Logout a user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.infotactToken;
  if (!token) {
    throw new ApiError({
      statusCode: 400,
      message: "Already logged out",
    });
  }

  res.clearCookie("infotactToken", {
    httpOnly: true,
    secure: ENV_VAR.NODE_ENV === "production",
    sameSite: ENV_VAR.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Logout successfully",
    })
  );
});
