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

export const getStoreByIdService = async (storeId: string) => {
  const store = await Store.findById(storeId)
    .populate("storeAdmin", "fullName email phone role")
    .lean();

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  return store;
};

interface UpdateStoreInput {
  brand?: string;
  description?: string;
  storeType?: string;

  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };
}

export const updateStoreService = async (
  storeId: string,
  adminId: string,
  updateData: UpdateStoreInput
) => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  if (store.storeAdmin.toString() !== adminId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  const updatedStore = await Store.findByIdAndUpdate(storeId, updateData, {
    new: true,
    runValidators: true,
  }).lean();

  return updatedStore;
};

export const deleteStoreService = async (adminId: string) => {
  const store = await Store.findOne({
    storeAdmin: adminId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  await store.deleteOne();

  await User.findByIdAndUpdate(adminId, {
    $unset: {
      store: "",
    },
  });

  return true;
};

export const getAdminStoreService = async (adminId: string) => {
  const store = await Store.findOne({
    storeAdmin: adminId,
  })
    .populate("storeAdmin", "fullName email phone role verified")
    .lean();

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  return store;
};

export const getEmployeeStoreService = async (userId: string) => {
  const user = await User.findById(userId)
    .populate({
      path: "store",
      populate: {
        path: "storeAdmin",
        select: "fullName email phone role",
      },
    })
    .lean();

  if (!user?.store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not assigned to this employee",
    });
  }

  return user.store;
};

export const getStoreEmployeesService = async (storeId: string) => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const employees = await User.find({
    store: storeId,
  })
    .select("-password")
    .lean();

  return employees;
};

interface AddEmployeeInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role:
    | "ROLE_STORE_ADMIN"
    | "ROLE_STORE_MANAGER"
    | "ROLE_BRANCH_MANAGER"
    | "ROLE_BRANCH_ADMIN"
    | "ROLE_BRANCH_CASHIER";
  branch?: string;
}

export const addEmployeeService = async (
  adminId: string,
  employeeData: AddEmployeeInput
) => {
  const store = await Store.findOne({
    storeAdmin: adminId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const existingUser = await User.findOne({
    email: employeeData.email,
  });

  if (existingUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Employee already exists with this email",
    });
  }

  const employee = await User.create({
    ...employeeData,
    store: store?._id,
  });

  const { password, ...safeEmployee } = employee.toObject();
  return safeEmployee;
};

export const getAllStoresService = async (status?: string) => {
  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  const stores = await Store.find(filter)
    .populate("storeAdmin", "fullName email phone role")
    .lean();

  return stores;
};

export const moderateStoreService = async (storeId: string, action: string) => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  store.status = action as "ACTIVE" | "PENDING" | "BLOCKED";

  await store.save();

  return store;
};

export const deactivateStoreService = async (storeAdminId: mongoose.Types.ObjectId) => {
  const store = await Store.findOne({
    storeAdmin: storeAdminId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  store.status = "INACTIVE";

  await store.save();

  return store;
};
