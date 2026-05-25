import { Edit, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomerDialog from "./CustomerDialog";
import { useState } from "react";

type Customer = {
  fullName: string;
  phone: string;
};

let selectedCustomer: Customer | null = {
  fullName: "John Doe",
  phone: "9876543210",
};

selectedCustomer = null;

export default function CustomerSection() {
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  return (
    <div className="border-b p-4">
      <h2 className="mb-3 flex items-center text-lg font-semibold">
        <User className="mr-2 h-5 w-5" />
        Customer
      </h2>

      {/* Selected Customer */}
      {selectedCustomer ? (
        <Card className="border-green-400 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="flex items-center justify-between gap-5 p-3">
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-200">
                {selectedCustomer.fullName}
              </h3>

              <p className="text-sm text-green-600 dark:text-green-300">
                {selectedCustomer.phone}
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                className="mt-2 w-full cursor-pointer"
                onClick={() => setShowCustomerDialog(true)}
              >
                <Edit />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Button
            variant="outline"
            className="w-full py-5 cursor-pointer"
            onClick={() => setShowCustomerDialog(true)}
          >
            Select Customer
          </Button>
        </div>
      )}

      {/* Customer Dialog */}
      <CustomerDialog
        showCustomerDialog={showCustomerDialog}
        setShowCustomerDialog={setShowCustomerDialog}
      />
    </div>
  );
}
