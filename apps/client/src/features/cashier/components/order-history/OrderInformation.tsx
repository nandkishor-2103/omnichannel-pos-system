import type { Order } from "@/app/store/order/orderTypes";

interface OrderInformationProps {
  selectedOrder: Order;
}

export default function OrderInformation({ selectedOrder }: OrderInformationProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold text-gray-900">
        Order Information
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {/* Order ID */}
        <div className="flex justify-between gap-3">
          <span className="shrink-0 text-sm text-gray-500">Order ID</span>
          <span
            className="text-right text-sm font-medium text-gray-900 break-all"
            title={selectedOrder.id}
          >
            #{selectedOrder.id}
          </span>
        </div>

        {/* Date */}
        <div className="flex justify-between gap-3">
          <span className="shrink-0 text-sm text-gray-500">Date</span>
          <span className="text-right text-sm text-gray-900">
            {new Date(selectedOrder.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center gap-3">
          <span className="shrink-0 text-sm text-gray-500">Status</span>
          <span className="inline-flex items-center rounded-full bg-green-700 px-2.5 py-0.5 text-xs font-semibold text-white uppercase tracking-wide">
            {selectedOrder.status}
          </span>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between gap-3">
          <span className="shrink-0 text-sm text-gray-500">Payment Method</span>
          <span className="text-right text-sm text-gray-900">
            {selectedOrder.paymentType}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between gap-3 border-t border-gray-200 pt-3 sm:pt-4">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Total Amount
          </span>
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ₹{selectedOrder.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
