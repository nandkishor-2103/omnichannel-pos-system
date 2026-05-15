import mongoose from "mongoose";
import Store from "../models/store.model.js";
import { Category } from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "../types/category.types.js";
import type { ICategory } from "../models/category.model.js";
import type { IStore } from "../models/store.model.js";

const checkStoreAccess = (store: IStore, user: Express.User): boolean => {
  if (user.role === "ROLE_ADMIN") {
    return true;
  }

  const isStoreAdmin =
    user.role === "ROLE_STORE_ADMIN" &&
    store.storeAdmin.toString() === user._id.toString();

  const isStoreManager =
    user.role === "ROLE_STORE_MANAGER" && user.store?.toString() === store._id.toString();

  if (!isStoreAdmin && !isStoreManager) {
    throw new ApiError({
      statusCode: 403,
      message: "Not authorized to access this store",
    });
  }

  return true;
};

// ================= CREATE CATEGORY =================
export const createCategoryService = async (
  data: CreateCategoryDto,
  user: Express.User
): Promise<ICategory> => {
  const { name, storeId } = data;

  const store = await Store.findById(storeId);
  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(store, user);

  const existingCategory = await Category.findOne({
    name,
    store: storeId,
  });

  if (existingCategory) {
    throw new ApiError({
      statusCode: 409,
      message: "Category already exists in this store",
    });
  }

  const category = await Category.create({
    name,
    store: new mongoose.Types.ObjectId(storeId),
  });

  return category;
};

// ================= GET CATEGORIES BY STORE =================
export const getCategoriesByStoreService = async (
  storeId: string
): Promise<ICategory[]> => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const categories = await Category.find({
    store: storeId,
  }).sort({
    createdAt: -1,
  });

  return categories;
};

// ================= UPDATE CATEGORY =================
export const updateCategoryService = async (
  categoryId: string,
  data: UpdateCategoryDto,
  user: Express.User
): Promise<ICategory> => {
  const category = await Category.findById(categoryId).populate("store");

  if (!category) {
    throw new ApiError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  const store = category.store as IStore;

  checkStoreAccess(store, user);

  if (data.name) {
    const existingCategory = await Category.findOne({
      name: data.name,
      store: store._id,
      _id: {
        $ne: categoryId,
      },
    });

    if (existingCategory) {
      throw new ApiError({
        statusCode: 409,
        message: "Category already exists",
      });
    }

    category.name = data.name;
  }

  await category.save();

  return category;
};

// ================= DELETE CATEGORY =================
export const deleteCategoryService = async (
  categoryId: string,
  user: Express.User
): Promise<boolean> => {
  const category = await Category.findById(categoryId).populate("store");

  if (!category) {
    throw new ApiError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  const store = category.store as IStore;

  checkStoreAccess(store, user);

  await category.deleteOne();

  return true;
};
