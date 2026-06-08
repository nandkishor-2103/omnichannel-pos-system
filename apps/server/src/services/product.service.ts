import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import Store from "../models/store.model.js";
import ApiError from "../utils/ApiError.js";
import type { CreateProductDto, UpdateProductDto } from "../types/product.types.js";
import type { IProduct } from "../models/product.model.js";
import { Inventory } from "../models/inventory.model.js";
import type { IUser } from "../models/user.model.js";

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
): Promise<boolean> => {
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
export const getProductsByStoreService = async (
  storeId: string,
  branchId?: string
): Promise<any[]> => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  /**
   * Store Admin / Manager
   * No branch provided -> return all store products
   */
  if (!branchId) {
    const products = await Product.find({
      store: storeId,
    })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean();

    return products.map((product) => ({
      _id: product._id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      mrp: product.mrp,
      sellingPrice: product.sellingPrice,
      brand: product.brand,
      image: product.image,
      category: product.category,
      store: product.store,
      availableQuantity: 0,
    }));
  }

  /**
   * Branch Cashier
   * Only products available in this branch inventory
   */
  const inventories = await Inventory.find({
    branch: branchId,
  })
    .populate({
      path: "product",
      match: {
        store: storeId,
      },
      populate: {
        path: "category",
        select: "name",
      },
    })
    .lean();

  const products = inventories
    .filter((inventory: any) => inventory.product)
    .map((inventory: any) => ({
      _id: inventory.product._id,

      name: inventory.product.name,

      sku: inventory.product.sku,

      description: inventory.product.description,

      mrp: inventory.product.mrp,

      sellingPrice: inventory.product.sellingPrice,

      brand: inventory.product.brand,

      image: inventory.product.image,

      category: inventory.product.category,

      store: inventory.product.store,

      availableQuantity: inventory.quantity,
    }));

  return products;
};

// ================== SEARCH PRODUCTS ==================

export const searchProductsService = async (
  storeId: string,
  query: string,
  user: IUser
): Promise<any[]> => {
  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const searchFilter = {
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
  };

  /**
   * Cashier
   * Search only branch inventory products
   */
  if (user.role === "ROLE_BRANCH_CASHIER") {
    if (!user.branch) {
    throw new ApiError({
      statusCode: 400,
      message: "Cashier branch not found",
    });
  }
    const inventories = await Inventory.find({
      branch: user.branch,
    })
      .populate({
        path: "product",

        match: {
          store: storeId,
          ...searchFilter,
        },

        populate: {
          path: "category",
          select: "name",
        },
      })
      .lean();

    return inventories
      .filter((inventory: any) => inventory.product)
      .map((inventory: any) => ({
        _id: inventory.product._id,

        name: inventory.product.name,

        sku: inventory.product.sku,

        description: inventory.product.description,

        mrp: inventory.product.mrp,

        sellingPrice: inventory.product.sellingPrice,

        brand: inventory.product.brand,

        image: inventory.product.image,

        category: inventory.product.category,

        store: inventory.product.store,

        availableQuantity: inventory.quantity,
      }));
  }

  /**
   * Store Admin
   * Store Manager
   * Branch Admin
   * Branch Manager
   *
   * Search all store products
   */
  const products = await Product.find({
    store: storeId,
    ...searchFilter,
  })
    .populate("category", "name")
    .sort({
      createdAt: -1,
    })
    .lean();

  return products.map((product: any) => ({
    _id: product._id,

    name: product.name,

    sku: product.sku,

    description: product.description,

    mrp: product.mrp,

    sellingPrice: product.sellingPrice,

    brand: product.brand,

    image: product.image,

    category: product.category,

    store: product.store,
  }));
};

// ================= GET PRODUCT FOR CASHIER SERVICE ==================
export const getProductsForCashierService = async (currentUser: IUser) => {
  if (!currentUser.branch) {
    throw new ApiError({
      statusCode: 400,
      message: "Branch not found",
    });
  }

  const inventories = await Inventory.find({
    branch: currentUser.branch,
  })
    .populate({
      path: "product",
      populate: [
        {
          path: "category",
          select: "name",
        },
        {
          path: "store",
          select: "brand",
        },
      ],
    })
    .lean();

  return inventories
    .filter((inventory: any) => inventory.product)
    .map((inventory: any) => ({
      _id: inventory.product._id,

      name: inventory.product.name,
      sku: inventory.product.sku,

      description: inventory.product.description,

      mrp: inventory.product.mrp,
      sellingPrice: inventory.product.sellingPrice,

      brand: inventory.product.brand,

      category: {
        _id: inventory.product.category?._id,
        name: inventory.product.category?.name,
      },

      store: {
        _id: inventory.product.store?._id,
        brand: inventory.product.store?.brand,
      },

      availableQuantity: inventory.quantity,
    }));
};
