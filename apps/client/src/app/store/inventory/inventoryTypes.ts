export interface Inventory {
  _id: string;
  branchId: string;
  productId: string;
  quantity: number;
  minStock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface InventoryResponse {
  inventory: Inventory;
  message?: string;
}

export interface InventoriesResponse {
  inventories: Inventory[];
  message?: string;
}

export interface CreateInventoryPayload {
  branchId: string;
  productId: string;
  quantity: number;
  minStock?: number;
}

export interface UpdateInventoryPayload {
  id: string;
  dto: Partial<CreateInventoryPayload>;
}

export interface InventoryState {
  inventories: Inventory[];
  inventory: Inventory | null;
  loading: boolean;
  error: string | null;
}
