import mongoose from "mongoose";
import Branch from "../models/branch.model.js";
import type { IBranch } from "../models/branch.model.js";
import Store from "../models/store.model.js";
import type { IStore } from "../models/store.model.js";
import ApiError from "../utils/ApiError.js";

interface CreateBranchPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingDays: IBranch["workingDays"];
  openTime: string;
  closeTime: string;
  storeId: string;
}

interface UpdateBranchPayload {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingDays?: IBranch["workingDays"];
  openTime?: string;
  closeTime?: string;
  manager?: string | null;
}

const checkStoreAccess = (
  store: mongoose.Types.ObjectId | IStore,
  user: Express.User
): boolean => {
  const populatedStore = store as IStore & {
    _id: mongoose.Types.ObjectId;
  };

  if (user.role === "ROLE_ADMIN") {
    return true;
  }

  const isStoreAdmin =
    user.role === "ROLE_STORE_ADMIN" &&
    populatedStore.storeAdmin.toString() === user._id.toString();

  const isStoreManager =
    user.role === "ROLE_STORE_MANAGER" &&
    user.store?.toString() === populatedStore._id.toString();

  if (!isStoreAdmin && !isStoreManager) {
    throw new ApiError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  return true;
};

export const createBranchService = async (
  data: CreateBranchPayload,
  user: Express.User
): Promise<IBranch> => {
  const store = await Store.findById(data.storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(store, user);

  const branch = await Branch.create({
    name: data.name,
    address: data.address,
    phone: data.phone,
    email: data.email,
    workingDays: data.workingDays,
    openTime: data.openTime,
    closeTime: data.closeTime,
    store: new mongoose.Types.ObjectId(data.storeId),
  });

  return branch;
};

export const getBranchByIdService = async (branchId: string): Promise<IBranch> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branch = await Branch.findById(branchId)
    .populate("store")
    .populate("manager", "fullName email");

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  return branch;
};

export const getBranchesByStoreService = async (
  storeId: string,
  user: Express.User
): Promise<IBranch[]> => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(store, user);

  const branches = await Branch.find({
    store: storeId,
  })
    .populate("manager", "fullName email")
    .sort({ createdAt: -1 });

  return branches;
};

export const updateBranchService = async (
  branchId: string,
  data: UpdateBranchPayload,
  user: Express.User
): Promise<IBranch> => {
  const branch = await Branch.findById(branchId).populate("store");

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  // ADMIN can update any branch
  if (user.role === "ROLE_ADMIN") {
    Object.assign(branch, data);

    await branch.save();

    return branch;
  }

  // BRANCH ADMIN / MANAGER can update only their own branch
  if (user.role === "ROLE_BRANCH_ADMIN" || user.role === "ROLE_BRANCH_MANAGER") {
    if (!user.branch || user.branch.toString() !== branch._id.toString()) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only update your own branch",
      });
    }

    Object.assign(branch, data);

    await branch.save();

    return branch;
  }

  // STORE ADMIN / STORE MANAGER access
  checkStoreAccess(branch.store, user);

  Object.assign(branch, data);

  await branch.save();

  return branch;
};

export const deleteBranchService = async (
  branchId: string,
  user: Express.User
): Promise<boolean> => {
  const branch = await Branch.findById(branchId).populate("store");

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  checkStoreAccess(branch.store, user);

  await branch.deleteOne();

  return true;
};
