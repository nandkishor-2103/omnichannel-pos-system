import User from "../models/user.model.js";
import ENV_VARS from "./env.js";

export const initializeAdmin = async () => {
  try {
    const adminCount = await User.countDocuments({
      role: "ROLE_ADMIN",
    });

    if (adminCount > 0) {
      return;
    }
    const existingAdmin = await User.findOne({
      role: "ROLE_ADMIN",
    });

    if (existingAdmin) {
      console.log("✅ Super Admin already exists");
      return;
    }

    const admin = await User.create({
      fullName: ENV_VARS.FULL_NAME,
      email: ENV_VARS.SUPER_ADMIN_EMAIL,
      password: ENV_VARS.SUPER_ADMIN_PASSWORD,
      phone: ENV_VARS.SUPER_ADMIN_PHONE,
      role: "ROLE_ADMIN",
      verified: ENV_VARS.VERIFIED === "true",
    });

    console.log("✅ Super Admin created successfully");
    console.log(`📧 Email: ${admin.email}`);
  } catch (error) {
    console.error("❌ Failed to initialize Super Admin:", error);
  }
};
