import CustomerInformation from "./CustomerInformation";
import OrderInformation from "./OrderInformation";
import OrderItemTable from "./OrderItemTable";

import type { Order } from "../../types/order";

interface OrderDetailsProps {
  selectedOrder: Order | null;
}

export default function OrderDetails({ selectedOrder }: OrderDetailsProps) {
  if (!selectedOrder) return null;

  return (
    <div className="space-y-5 py-4">
      <div className="grid grid-cols-2 gap-4">
        <OrderInformation selectedOrder={selectedOrder} />

        <CustomerInformation selectedOrder={selectedOrder} />
      </div>

      <OrderItemTable selectedOrder={selectedOrder} />
    </div>
  );
}