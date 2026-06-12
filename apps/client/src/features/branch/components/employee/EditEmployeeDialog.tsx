import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";

import type { EmployeeFormValues } from "../../types/employee";
import EmployeeForm from "@/features/store/components/employee/EmployeeForm";
import { useState } from "react";

const roles: string[] = [
  "ROLE_BRANCH_ADMIN",
  "ROLE_BRANCH_MANAGER",
  "ROLE_BRANCH_CASHIER",
];

type EditEmployeeDialogProps = {
  selectedEmployee?: EmployeeFormValues;
  handleOpenEditDialog: () => void;
};

export default function EditEmployeeDialog({
  selectedEmployee,
  handleOpenEditDialog,
}: EditEmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpenEditDialog}
          variant="outline"
          className="cursor-pointer"
        >
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>

          <DialogDescription>Fill employee information below.</DialogDescription>
        </DialogHeader>

        <EmployeeForm
          key={selectedEmployee?.employeeId ?? "edit"}
          roles={roles}
          initialData={selectedEmployee}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
