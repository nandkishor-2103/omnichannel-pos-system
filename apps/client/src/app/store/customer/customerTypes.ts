export interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  branch: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    customer: Customer;
  };
}

export interface CustomersResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    customers: Customer[];
  };
}

export interface CreateCustomerPayload {
  fullName: string;
  email: string;
  phone: string;
}

export interface UpdateCustomerPayload {
  id: string;

  customerData: Partial<CreateCustomerPayload>;
}

export interface CustomerState {
  customers: Customer[];
  searchResults: Customer[];
  customer: Customer | null;
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}
