export interface Branch {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  storeId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BranchResponse {
  branch: Branch;
  message?: string;
}

export interface BranchesResponse {
  branches: Branch[];
  message?: string;
}

export interface CreateBranchPayload {
  name: string;
  address: string;
  phone?: string;
  email?: string;
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
