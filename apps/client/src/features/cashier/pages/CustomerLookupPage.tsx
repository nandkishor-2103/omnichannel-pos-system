import { useState } from "react";
import { UserIcon } from "lucide-react";

import CustomerDetails from "../components/customer-management/CustomerDetails";
import CustomerList from "../components/customer-management/CustomerList";
import CustomerSearch from "../components/customer-management/CustomerSearch";
import PurchaseHistory from "../components/customer-management/PurchaseHistory";

export type Customer = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
};

export default function CustomerLookupPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <h2 className="text-2xl font-bold">Customer Management</h2>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="flex w-1/3 flex-col border-r">
          <CustomerSearch />
          <CustomerList setSelectedCustomer={setSelectedCustomer} />
        </div>

        {/* Right Panel */}
        {selectedCustomer ? (
          <div className="flex w-2/3 flex-col overflow-hidden">
            <CustomerDetails customer={selectedCustomer} />
            <PurchaseHistory />
          </div>
        ) : (
          <div className="flex w-2/3 items-center justify-center">
            <div className="flex flex-col items-center rounded-2xl border bg-card px-10 py-12 shadow-sm">
              <div className="mb-4 rounded-full bg-primary/10 p-5">
                <UserIcon className="h-10 w-10 text-primary" />
              </div>

              <h2 className="text-xl font-semibold">No Customer Selected</h2>

              <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
                Select a customer from the left panel to view details, loyalty points, and
                purchase history.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
