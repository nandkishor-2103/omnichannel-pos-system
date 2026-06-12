import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import EmployeeForm from "./EmployeeForm";

const roles: string[] = [
  "ROLE_BRANCH_ADMIN",
  "ROLE_BRANCH_MANAGER",
  "ROLE_BRANCH_CASHIER",
];

export default function AddEmployeeDialog() {
  return (
    <Dialog>
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

        <EmployeeForm roles={roles} />
      </DialogContent>
    </Dialog>
  );
}
