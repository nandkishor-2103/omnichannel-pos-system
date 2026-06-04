export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerResponse {
  customer: Customer;
  message?: string;
}

export interface CustomersResponse {
  customers: Customer[];
  message?: string;
}

export interface CreateCustomerPayload {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateCustomerPayload {
  id: string;
  customer: Partial<CreateCustomerPayload>;
}
