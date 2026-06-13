export interface StoreContact {
  address: string;
  phone: string;
  email: string;
}

export interface StoreInfo {
  _id: string;
  brand: string;
  storeAdmin: string;
  description: string;
  storeType: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
  contact: StoreContact;
  createdAt: string;
  updatedAt: string;
}

export interface BranchManager {
  _id: string;
  fullName: string;
  email: string;
}

export interface Branch {
  _id: string;
  name: string;
  address: string;

  phone: string;
  email: string;

  workingDays: string[];

  openTime: string;
  closeTime: string;

  store?: string | StoreInfo;

  manager: BranchManager | null;

  createdAt: string;
  updatedAt: string;
}

export interface BranchResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    branch: Branch;
  };
}

export interface BranchesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    branches: Branch[];
  };
}

export interface CreateBranchPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingDays: string[];
  openTime: string;
  closeTime: string;
  storeId: string;
}

export interface UpdateBranchPayload {
  id: string;
  dto: Partial<CreateBranchPayload>;
}

export interface BranchState {
  branch: Branch | null;
  branches: Branch[];
  employees: unknown[];
  loading: boolean;
  error: string | null;
}
