import type { Customer } from "../customer/customerTypes";

export type DiscountType = "percentage" | "fixed";

export type PaymentMethod = "cash" | "card" | "upi";

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  sellingPrice: number;
  quantity: number;
  availableQuantity: number;
}

export interface Discount {
  type: DiscountType;
  value: number;
}

export interface HeldOrder {
  id: number;
  items: CartItem[];
  customer: Customer | null;
  note: string;
  discount: Discount;
  totalAmount: number;
  timestamp: string;
}

export interface CartState {
  items: CartItem[];
  selectedCustomer: Customer | null;
  note: string;
  discount: Discount;
  paymentMethod: PaymentMethod;
  heldOrders: HeldOrder[];
  currentOrder: HeldOrder | null;
}
