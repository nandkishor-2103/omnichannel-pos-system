import jwt from "jsonwebtoken";
import ENV_VAR from "../config/env.js";

const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
     ENV_VAR.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
};

export default generateToken;
