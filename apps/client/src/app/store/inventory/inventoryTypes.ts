export interface Inventory {
  _id: string;
  branch: {
    _id: string;
    name: string;
  };
  product: {
    _id: string;
    name: string;
    sku: string;
    brand: string;
    image: string;
    category: {
      _id: string;
      name: string;
    };
  };
  quantity: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    inventory: Inventory;
  };
}

export interface InventoriesResponse {
  statusCode: number;
  success: true;
  message: string;
  payload: {
    inventories: Inventory[];
  };
}

export interface CreateInventoryPayload {
  branchId: string;
  productId: string;
  quantity: number;
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
