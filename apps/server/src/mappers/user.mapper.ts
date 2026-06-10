import mongoose from "mongoose";

import type { UserResponseDto } from "../types/user.dto.js";

type PopulatedStore = {
  _id: mongoose.Types.ObjectId;
  brand: string;
};

type PopulatedBranch = {
  _id: mongoose.Types.ObjectId;
  name: string;
};

export const mapUserToResponseDto = (user: any): UserResponseDto => {
  const store = user.store as PopulatedStore | null;

  const branch = user.branch as PopulatedBranch | null;

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    verified: user.verified,

    store: store
      ? {
          id: store._id.toString(),
          brand: store.brand,
        }
      : null,

    branch: branch
      ? {
          id: branch._id.toString(),
          name: branch.name,
        }
      : null,

    lastLogin: user.lastLogin,
  };
};
