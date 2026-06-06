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
import { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import { SearchIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getAllCustomers, searchCustomer } from "@/app/store/customer/customerThunk";

import type { Customer } from "../../../../app/store/customer/customerTypes";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { clearSearchResults } from "@/app/store/customer/customerSlice";
import { setSelectedCustomer } from "@/app/store/cart/cartSlice";

type CustomerDialogProps = {
  showCustomerDialog: boolean;
  setShowCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomerDialog({
  showCustomerDialog,
  setShowCustomerDialog,
}: CustomerDialogProps) {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useAppDispatch();

  const customers = useAppSelector((state) => state.customer.customers);
  const loading = useAppSelector((state) => state.customer.loading);
  const searchResults = useAppSelector((state) => state.customer.searchResults);

  function handleSelectCustomer(customer: Customer): void {
    // console.log(`Selected customer: ${customer.fullName}`);

    dispatch(setSelectedCustomer(customer))

    setShowCustomerDialog(false);
  }

  // Get All Customer of Branch
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  // Search Customer of Branch
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchTerm.trim();

      if (query.length >= 2) {
        dispatch(searchCustomer(query));
      } else {
        dispatch(clearSearchResults());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const displayedCustomers =
    searchTerm.trim().length >= 2 ? searchResults : customers.slice(0, 5);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner size={16} text="Searching customers..." />
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {searchTerm.trim()
                  ? `${searchResults.length} customer(s) found`
                  : "Recent customers"}
              </p>
            </div>

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
                {displayedCustomers.map((customer) => (
                  <TableRow key={customer._id}>
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
        )}

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
