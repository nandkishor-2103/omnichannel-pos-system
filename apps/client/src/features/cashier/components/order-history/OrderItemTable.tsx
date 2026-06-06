import type { Order } from "@/app/store/order/orderTypes";

interface OrderItemTableProps {
  selectedOrder: Order;
}

export default function OrderItemTable({ selectedOrder }: OrderItemTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      {/* This header row never scrolls */}
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Order Items</h2>
        <span className="text-sm text-gray-500">{selectedOrder.items.length} Items</span>
      </div>

      {/* Only this div scrolls */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[180px] sm:max-h-[220px] md:max-h-[260px]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                  Product
                </th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                  Qty
                </th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                  Price
                </th>
                <th className="px-3 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {selectedOrder.items.map((item) => (
                <tr key={item.product?.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-lg border border-gray-200 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[140px] sm:max-w-xs">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">SKU: {item.product?.sku}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                    {item.quantity}
                  </td>

                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                    ₹{(item.product?.sellingPrice ?? 0).toFixed(2)}
                  </td>

                  <td className="px-3 py-3 text-right font-semibold text-gray-900 whitespace-nowrap">
                    ₹{((item.product?.sellingPrice ?? 0) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
