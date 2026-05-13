import mongoose from "mongoose";

import Store from "../models/store.model.js";
import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

interface CreateStoreInput {
  brand: string;

  description?: string;

  storeType?: string;

  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };

  adminId: string;
}

export const createStoreService = async ({
  brand,
  description,
  storeType,
  contact,
  adminId,
}: CreateStoreInput) => {
  // Check existing store
  const existingStore = await Store.findOne({
    storeAdmin: adminId,
  });

  if (existingStore) {
    throw new ApiError({
      statusCode: 400,

      message: "Store already exists for this admin",
    });
  }

  // Prepare store data
  const storeData: Record<string, unknown> = {
    brand,
    storeAdmin: new mongoose.Types.ObjectId(adminId),
  };

  if (description) {
    storeData.description = description;
  }

  if (storeType) {
    storeData.storeType = storeType;
  }

  if (contact) {
    storeData.contact = contact;
  }

  // Create store
  const newStore = await Store.create(storeData);

  // Update user's store reference
  await User.findByIdAndUpdate(adminId, {
    store: newStore._id,
  });

  // Populate the storeAdmin field before returning
  const populatedStore = await Store.findById(newStore._id)
    .populate("storeAdmin", "fullName email phone role")
    .lean();

  if (!populatedStore) {
    throw new ApiError({
      statusCode: 404,

      message: "Store not found after creation",
    });
  }

  return populatedStore;
};
