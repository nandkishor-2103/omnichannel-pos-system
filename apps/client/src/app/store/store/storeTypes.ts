export interface StoreContact {
  address?: string;
  phone?: string;
  email?: string;
}

export interface StoreAdmin {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  verified: boolean;
}

export interface Store {
  _id: string;

  brand: string;

  description?: string;

  storeType?: string;

  status?: "PENDING" | "ACTIVE" | "BLOCKED";

  contact?: StoreContact;

  storeAdmin?: StoreAdmin;

  createdAt?: string;

  updatedAt?: string;
}

export interface StoreResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    store: Store;
  };
}

export interface StoresResponse {
  stores: Store[];
  message?: string;
}

export interface StoreEmployee {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface StoreEmployeesResponse {
  employees: StoreEmployee[];
  message?: string;
}

export interface CreateStorePayload {
  brand: string;

  description?: string;

  storeType?: string;

  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };
}

export interface UpdateStorePayload {
  id: string;

  storeData: {
    brand?: string;

    description?: string;

    storeType?: string;

    contact?: {
      address?: string;
      phone?: string;
      email?: string;
    };
  };
}

export interface ModerateStorePayload {
  storeId: string;
  action: "APPROVE" | "REJECT" | "BLOCK";
}

export interface StoreState {
  store: Store | null;

  stores: Store[];

  employees: StoreEmployee[];

  loading: boolean;

  error: string | null;
}
