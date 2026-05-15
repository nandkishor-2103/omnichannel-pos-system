import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import Store from "../models/store.model.js";
import ApiError from "../utils/ApiError.js";
import type { CreateProductDto, UpdateProductDto } from "../types/product.types.js";
import type { IProduct } from "../models/product.model.js";

const checkStoreAccess = (store: any, user: Express.User): boolean => {
  if (user.role === "ROLE_ADMIN") {
    return true;
  }

  if (
    user.role === "ROLE_STORE_ADMIN" &&
    store.storeAdmin.toString() === user._id.toString()
  ) {
    return true;
  }

  if (
    user.role === "ROLE_STORE_MANAGER" &&
    user.store &&
    user.store.toString() === store._id.toString()
  ) {
    return true;
  }

  throw new ApiError({
    statusCode: 403,
    message: "You are not allowed to access this store",
  });
};

// ================== Create Product ==================
export const createProductService = async (
  data: CreateProductDto,
  user: Express.User
): Promise<IProduct> => {
  const existingStore = await Store.findById(data.store);

  if (!existingStore) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(existingStore, user);

  const existingCategory = await Category.findById(data.category);
  if (!existingCategory) {
    throw new ApiError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  const existingSku = await Product.findOne({
    sku: data.sku,
  });

  if (existingSku) {
    throw new ApiError({
      statusCode: 409,
      message: "SKU already exists",
    });
  }

  const product = await Product.create(data);

  return product;
};

// ================== GET PRODUCT BY ID ==================
export const getProductByIdService = async (productId: string): Promise<IProduct> => {
  const product = await Product.findById(productId)
    .populate("category", "name")
    .populate("store", "brand");

  if (!product) {
    throw new ApiError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  return product;
};

// ================== UPDATE PRODUCT ==================
export const updateProductService = async (
  productId: string,
  data: UpdateProductDto,
  user: Express.User
): Promise<IProduct> => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  const store = await Store.findById(product.store);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(store, user);

  if (data.sku) {
    const existingSku = await Product.findOne({
      sku: data.sku,
      _id: { $ne: productId },
    });

    if (existingSku) {
      throw new ApiError({
        statusCode: 409,
        message: "SKU already exists",
      });
    }
  }

  if (data.category) {
    const category = await Category.findById(data.category);

    if (!category) {
      throw new ApiError({
        statusCode: 404,
        message: "Category not found",
      });
    }
  }

  Object.assign(product, data);

  await product.save();

  return product;
};

// ================== DELETE PRODUCT ==================
export const deleteProductService = async (
  productId: string,
  user: Express.User
): Promise<void> => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  const store = await Store.findById(product.store);
  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  checkStoreAccess(store, user);

  await product.deleteOne();

  return true;
};

// ================== GET PRODUCTS BY STORE ==================
export const getProductsByStoreService = async (storeId: string): Promise<IProduct[]> => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const products = await Product.find({
    store: storeId,
  })
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return products;
};

// ================== SEARCH PRODUCTS ==================
export const searchProductsService = async (
  storeId: string,
  query: string
): Promise<IProduct[]> => {
  const store = await Store.findById(storeId);
  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const products = await Product.find({
    store: storeId,

    $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },

      {
        brand: {
          $regex: query,
          $options: "i",
        },
      },

      {
        description: {
          $regex: query,
          $options: "i",
        },
      },

      {
        sku: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  })
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return products;
};
