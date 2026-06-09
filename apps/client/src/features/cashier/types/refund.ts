export interface Product {
  image: string;
  name: string;
  sellingPrice: number;
  sku: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Customer {
  fullName: string;
  phone: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: Customer;
  totalAmount: number;
  paymentType: "CASH" | "CARD" | "UPI";
  status: "COMPLETED" | "PENDING" | "CANCELLED" | "REFUNDED";
  items: OrderItem[];
}
