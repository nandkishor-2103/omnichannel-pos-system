import { Mail, Phone, User } from "lucide-react";
import type { Order } from "@/app/store/order/orderTypes";

interface CustomerInformationProps {
  selectedOrder: Order;
}

export default function CustomerInformation({ selectedOrder }: CustomerInformationProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold text-gray-900">
        Customer Information
      </h3>

      <div className="space-y-4 sm:space-y-5">
        {/* Name */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex shrink-0 items-center gap-2 text-gray-500">
            <User className="h-4 w-4" />
            <span className="text-sm">Name</span>
          </div>
          <span className="text-right text-sm font-medium text-gray-900">
            {selectedOrder.customer.fullName}
          </span>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex shrink-0 items-center gap-2 text-gray-500">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Phone</span>
          </div>
          <span className="whitespace-nowrap text-sm text-gray-900">
            {selectedOrder.customer.phone}
          </span>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex shrink-0 items-center gap-2 text-gray-500">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Email</span>
          </div>
          <span
            className="text-right text-sm break-all text-gray-900"
            title={selectedOrder.customer.email}
          >
            {selectedOrder.customer.email || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
