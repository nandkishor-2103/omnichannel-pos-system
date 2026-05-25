import { useState } from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CustomerForm from "../customer-payment-section/CustomerForm";

export default function CustomerSearch() {
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false);

  return (
    <div className="border-b p-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input className="pl-10" placeholder="Search Customers..." type="text" />
        </div>

        <Button onClick={() => setShowCustomerForm(true)} className="cursor-pointer">
          Add New Customer
        </Button>
      </div>

      <CustomerForm
        showCustomerForm={showCustomerForm}
        setShowCustomerForm={setShowCustomerForm}
      />
    </div>
  );
}
