import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import CustomerForm from "./CustomerForm";
import { SearchIcon } from "lucide-react";

type Customer = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
};

type CustomerDialogProps = {
  showCustomerDialog: boolean;
  setShowCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const customers: Customer[] = [
  {
    id: 1,
    fullName: "John Doe",
    phone: "9876543210",
    email: "john.doe@example.com",
  },

  {
    id: 2,
    fullName: "Jane Doe",
    phone: "1234567890",
    email: "jane.doe@example.com",
  },

  {
    id: 3,
    fullName: "Bob Doe",
    phone: "0987654321",
    email: "bob.doe@example.com",
  },

  {
    id: 4,
    fullName: "Alice Doe",
    phone: "0987654321",
    email: "alice.doe@example.com",
  },

  {
    id: 5,
    fullName: "Charlie Doe",
    phone: "0987654321",
    email: "charlie.doe@example.com",
  },
];

export default function CustomerDialog({
  showCustomerDialog,
  setShowCustomerDialog,
}: CustomerDialogProps) {
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  function handleSelectCustomer(customer: Customer): void {
    console.log(`Selected customer: ${customer.fullName}`);

    setShowCustomerDialog(false);
  }

  return (
    <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative">
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
            <Input
              className="pl-10 focus-visible:ring-green-500"
              placeholder="Search Customers..."
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Name</TableHead>
                <TableHead className="w-1/2">Phone</TableHead>
                <TableHead className="w-1/2">Email</TableHead>
                <TableHead className="w-1/2">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.fullName}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-700 hover:bg-green-800 text-white cursor-pointer"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button onClick={() => setShowCustomerForm(true)} className="cursor-pointer">
            Add New Customer
          </Button>
        </DialogFooter>

        <CustomerForm
          showCustomerForm={showCustomerForm}
          setShowCustomerForm={setShowCustomerForm}
        />
      </DialogContent>
    </Dialog>
  );
}
