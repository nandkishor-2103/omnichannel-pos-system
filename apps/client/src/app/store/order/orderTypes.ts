export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CreateOrderPayload {
  customerId: string;
  paymentType: string;
  totalAmount: number;
  note?: string;

  items: OrderItem[];
}

export interface Order {
  id: string;

  totalAmount: number;
  paymentType: string;
  status: string;
  note?: string;

  customer: {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
  };

  cashier: {
    id: string;
    fullName: string;
  };

  branch: {
    id: string;
    name: string;
  };

  items: {
    product: {
      id: string;
      name: string;
      sku?: string;
      image?: string;
      sellingPrice: number;
    } | null;

    quantity: number;
    price: number;
  }[];

  createdAt: string;
}

export interface OrderResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    order: Order;
  };
}

export interface OrdersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    orders: Order[];
  };
}

export interface OrdersByBranchPayload {
  branchId: string;
  customerId?: string;
  cashierId?: string;
  paymentType?: string;
  status?: string;
}
