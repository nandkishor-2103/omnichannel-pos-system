export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  storeId?: string;
  branchId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeResponse {
  employee: Employee;
  message?: string;
}

export interface EmployeesResponse {
  employees: Employee[];
  message?: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
}

export interface CreateStoreEmployeePayload {
  storeId: string;
  employee: CreateEmployeePayload;
}

export interface CreateBranchEmployeePayload {
  branchId: string;
  employee: CreateEmployeePayload;
}

export interface UpdateEmployeePayload {
  employeeId: string;
  employeeDetails: Partial<CreateEmployeePayload>;
}

export interface BranchEmployeeParams {
  branchId: string;
  role?: string;
}

export interface EmployeeState {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string | null;
}
