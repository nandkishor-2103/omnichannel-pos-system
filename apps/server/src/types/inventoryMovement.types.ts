import { Types } from "mongoose";

export type InventoryMovementType =
  | "STOCK_IN"
  | "SALE"
  | "REFUND"
  | "DAMAGED"
  | "ADJUSTMENT";

export interface InventoryMovementDto {
  inventory: Types.ObjectId;
  product: Types.ObjectId;
  branch: Types.ObjectId;

  type: InventoryMovementType;

  quantity: number;

  previousQuantity: number;

  newQuantity: number;

  performedBy?: Types.ObjectId;

  notes?: string;
}
