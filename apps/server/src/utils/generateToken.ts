import jwt from "jsonwebtoken";
import type { Response } from "express";
import ENV_VAR from "../config/env.js";
import type { IUser } from "../models/user.model.js";

async function generateToken(res: Response, user: IUser) {
  const infotactToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    ENV_VAR.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("infotactToken", infotactToken, {
    httpOnly: true,
    secure: ENV_VAR.NODE_ENV === "production",
    sameSite: ENV_VAR.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return infotactToken; // optional: return if you need it elsewhere
}

export default generateToken;
