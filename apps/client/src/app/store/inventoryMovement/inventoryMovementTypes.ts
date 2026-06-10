export type InventoryMovementType = "SALE" | "REFUND" | "ADJUSTMENT";

export interface InventoryMovement {
  _id: string;

  type: InventoryMovementType;

  quantity: number;

  previousQuantity: number;

  newQuantity: number;

  notes?: string;

  createdAt: string;

  product: {
    _id: string;
    name: string;
  };

  branch: {
    _id: string;
    name: string;
  };

  performedBy?: {
    _id: string;
    fullName: string;
  };
}

export interface InventoryMovementState {
  movements: InventoryMovement[];
  loading: boolean;
  error: string | null;
}
