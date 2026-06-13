export type EmployeeFormValues = {
  employeeId?: string;

  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  branchId: string;
};

export type StoreEmployeeFormValues = {
  employeeId: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  storeId: string;

  branchId?: string;
};
