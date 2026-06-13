import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmployeeForm from "@/features/store/components/employee/EmployeeForm";

import { Plus } from "lucide-react";
import { useState } from "react";

const roles: string[] = ["ROLE_STORE_MANAGER", "ROLE_BRANCH_ADMIN"];

export default function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>

          <DialogDescription>Fill employee information below.</DialogDescription>
        </DialogHeader>

        <EmployeeForm key="add-employee" roles={roles} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
