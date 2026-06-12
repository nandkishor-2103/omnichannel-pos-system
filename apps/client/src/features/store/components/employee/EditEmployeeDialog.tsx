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

import EmployeeForm from "./EmployeeForm";
import type { EmployeeFormValues } from "../../types/employee";

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
  console.log("Selected Employee: ", selectedEmployee);
  return (
    <Dialog>
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
          roles={roles}
          initialData={selectedEmployee}
        />
      </DialogContent>
    </Dialog>
  );
}
