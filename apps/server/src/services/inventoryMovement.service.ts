import InventoryMovement from "../models/inventoryMovement.model.js";

import type { InventoryMovementDto } from "../types/inventoryMovement.types.js";
import ApiError from "../utils/ApiError.js";

export const createInventoryMovement = async (data: InventoryMovementDto) => {
  return await InventoryMovement.create(data);
};

import mongoose from "mongoose";

export const getInventoryMovementsService = async () => {
  return await InventoryMovement.find()
    .populate("product", "name")
    .populate("branch", "name")
    .populate("performedBy", "fullName")
    .sort({ createdAt: -1 });
};

export const getInventoryMovementsByProductService = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid product ID",
    });
  }

  return await InventoryMovement.find({
    product: productId,
  })
    .populate("product", "name")
    .populate("branch", "name")
    .populate("performedBy", "fullName")
    .sort({ createdAt: -1 });
};
