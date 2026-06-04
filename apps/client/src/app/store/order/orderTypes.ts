export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  customerId: string;
  cashierId: string;
  branchId: string;
  paymentType: string;
  items: OrderItem[];
}

export interface Order {
  _id: string;
  customerId: string;
  cashierId: string;
  branchId: string;
  paymentType: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  order: Order;
  message?: string;
}

export interface OrdersResponse {
  orders: Order[];
  message?: string;
}

export interface OrdersByBranchPayload {
  branchId: string;
  customerId?: string;
  cashierId?: string;
  paymentType?: string;
  status?: string;
}
