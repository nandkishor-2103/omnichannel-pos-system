export type WorkingDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Employee {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  store: {
    _id: string;
    brand: string;
    storeAdmin: string;
    description: string;
    storeType: string;
    status: string;
    contact: {
      address: string;
      phone: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  branch: {
    _id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    workingDays: WorkingDay[];
    openTime: string;
    closeTime: string;
    store: string;
    manager: string;
    createdAt: string;
    updatedAt: string;
  };
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;

  lastLogin: string;
}

export interface EmployeeResponse {
  statusCode: number;
  message: string;
  success: boolean;
  payload: {
    employee: Employee;
  };
}

export interface EmployeesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  payload: {
    employees: Employee[];
  };
}

export interface CreateEmployeePayload {
  fullName: string;
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
