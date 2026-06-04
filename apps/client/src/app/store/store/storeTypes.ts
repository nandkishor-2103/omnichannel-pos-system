export interface Store {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreResponse {
  store: Store;
  message?: string;
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
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateStorePayload {
  id: string;
  storeData: Partial<CreateStorePayload>;
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
