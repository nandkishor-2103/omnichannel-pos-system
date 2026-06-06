import { Edit, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomerDialog from "./CustomerDialog";
import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectSelectedCustomer } from "@/app/store/cart/cartSelectors";

export default function CustomerSection() {
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  const selectedCustomer = useAppSelector(selectSelectedCustomer);

  return (
    <div className="border-b p-4">
      <h2 className="mb-3 flex items-center text-lg font-semibold">
        <User className="mr-2 h-5 w-5" />
        Customer
      </h2>

      {/* Selected Customer */}
      {selectedCustomer ? (
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {selectedCustomer.fullName}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedCustomer.phone}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {selectedCustomer.email || "No Email"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setShowCustomerDialog(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-2 ">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="text-center">
              <h3 className="font-medium">No Customer Selected</h3>

              <p className="text-sm text-muted-foreground">
                Select a customer for this order
              </p>
            </div>

            <Button
              className="cursor-pointer"
              onClick={() => setShowCustomerDialog(true)}
            >
              Select Customer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Customer Dialog */}
      <CustomerDialog
        showCustomerDialog={showCustomerDialog}
        setShowCustomerDialog={setShowCustomerDialog}
      />
    </div>
  );
}
