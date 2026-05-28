export type Order = {
  id: string;
  customer: string;
  cashier: string;
  createdAt: string;
  totalAmount: number;
  paymentType: "CASH" | "CARD" | "UPI";
  status: "COMPLETED" | "PENDING" | "CANCELLED";
};
