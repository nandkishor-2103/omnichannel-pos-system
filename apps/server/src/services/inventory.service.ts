import mongoose from "mongoose";
import { Inventory } from "../models/inventory.model.js";
import type { IInventory } from "../models/inventory.model.js";
import Branch from "../models/branch.model.js";
import { Product } from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import { createInventoryMovement } from "./inventoryMovement.service.js";

interface CreateInventoryInput {
  branchId: string;
  productId: string;
  quantity: number;
}

interface UpdateInventoryInput {
  quantity: number;
}

export const createInventoryService = async ({
  branchId,
  productId,
  quantity,
}: CreateInventoryInput): Promise<IInventory> => {
  const branch = await Branch.findById(branchId);

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError({
      statusCode: 404,
      message: "Product not found",
    });
  }

  const existingInventory = await Inventory.findOne({
    branch: branchId,
    product: productId,
  });

  if (existingInventory) {
    throw new ApiError({
      statusCode: 409,
      message: "Inventory already exists for this product in this branch",
    });
  }

  const inventory = await Inventory.create({
    branch: new mongoose.Types.ObjectId(branchId),
    product: new mongoose.Types.ObjectId(productId),
    quantity,
  });

  const inventoryWithDetails = await Inventory.findById(inventory._id)
    .populate("branch")
    .populate("product");

  return inventoryWithDetails as IInventory;
};

export const updateInventoryService = async (
  id: string,
  { quantity }: UpdateInventoryInput
): Promise<IInventory> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid inventory ID",
    });
  }

  const inventory = await Inventory.findById(id);

  if (!inventory) {
    throw new ApiError({
      statusCode: 404,
      message: "Inventory not found",
    });
  }

  const previousQuantity = inventory.quantity;

  inventory.quantity = quantity;

  inventory.lastUpdated = new Date();

  await inventory.save();

  await createInventoryMovement({
    inventory: inventory._id,
    product: inventory.product,
    branch: inventory.branch,

    type: "ADJUSTMENT",

    quantity: Math.abs(quantity - previousQuantity),

    previousQuantity,

    newQuantity: quantity,

    notes: "Manual inventory adjustment",
  });

  inventory.lastUpdated = new Date();

  await inventory.save();

  const updatedInventory = await Inventory.findById(id)
    .populate("branch")
    .populate("product");

  return updatedInventory as IInventory;
};

export const deleteInventoryService = async (id: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid inventory ID",
    });
  }

  const inventory = await Inventory.findById(id);

  if (!inventory) {
    throw new ApiError({
      statusCode: 404,
      message: "Inventory not found",
    });
  }

  await Inventory.findByIdAndDelete(id);
};

export const getInventoryByIdService = async (id: string): Promise<IInventory> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid inventory ID",
    });
  }

  const inventory = await Inventory.findById(id).populate("branch").populate("product");

  if (!inventory) {
    throw new ApiError({
      statusCode: 404,
      message: "Inventory not found",
    });
  }

  return inventory as IInventory;
};

export const getInventoryByProductIdService = async (
  productId: string
): Promise<IInventory[]> => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid product ID",
    });
  }

  const inventories = await Inventory.find({
    product: productId,
  })
    .populate("branch")
    .populate("product");

  return inventories as IInventory[];
};

export const getInventoryByBranchService = async (
  branchId: string
): Promise<IInventory[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const inventories = await Inventory.find({
    branch: branchId,
  })
    .populate("branch")
    .populate("product");

  return inventories as IInventory[];
};
