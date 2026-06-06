import CustomerInformation from "./CustomerInformation";
import OrderInformation from "./OrderInformation";
import OrderItemTable from "./OrderItemTable";

import type { Order } from "@/app/store/order/orderTypes";

interface OrderDetailsProps {
  selectedOrder: Order | null;
}

export default function OrderDetails({ selectedOrder }: OrderDetailsProps) {
  if (!selectedOrder) return null;

  return (
    <div className="space-y-4 sm:space-y-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <OrderInformation selectedOrder={selectedOrder} />
        <CustomerInformation selectedOrder={selectedOrder} />
      </div>

      
      <OrderItemTable selectedOrder={selectedOrder} />
    </div>
  );
}
