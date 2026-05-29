// EmployeeTable.tsx

import { useState } from "react";

import { ArrowUpDown } from "lucide-react";

import EditEmployeeDialog from "./EditEmployeeDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { EmployeeFormValues } from "../../types/employee";

type Employee = {
  id: number;
  name: string;
  role: string;
  email: string;
  loginAccess: "Enabled" | "Disabled";
  assignSince: string;
  status: "Active" | "Inactive" | "Pending";
  actions: string;
};

const employeeData: Employee[] = [
  {
    id: 1234,
    name: "Aarav Sharma",
    role: "Branch Manager",
    email: "aarav.sharma@example.com",
    loginAccess: "Enabled",
    assignSince: "12 Jan 2024",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    id: 2356,
    name: "Priya Verma",
    role: "Cashier",
    email: "priya.verma@example.com",
    loginAccess: "Enabled",
    assignSince: "05 Mar 2024",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    id: 45734,
    name: "Rohan Patil",
    role: "Inventory Manager",
    email: "rohan.patil@example.com",
    loginAccess: "Disabled",
    assignSince: "18 Feb 2024",
    status: "Inactive",
    actions: "Edit/Delete",
  },
  {
    id: 346468,
    name: "Sneha Joshi",
    role: "Store Admin",
    email: "sneha.joshi@example.com",
    loginAccess: "Enabled",
    assignSince: "22 Apr 2024",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    id: 344647,
    name: "Karan Mehta",
    role: "Sales Executive",
    email: "karan.mehta@example.com",
    loginAccess: "Enabled",
    assignSince: "10 May 2024",
    status: "Pending",
    actions: "Edit/Delete",
  },
];

export default function EmployeeTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormValues>();

  const handleOpenEditDialog = () => {
    setSelectedEmployee({
      fullName: "John Doe",
      role: "ROLE_BRANCH_CASHIER",
      email: "john.doe@gmail.com",
      password: "john234@345!doe",
      phone: "+91 7400345689",
      branchId: "",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            "Name",
            "Role",
            "Email",
            "Login Access",
            "Assign Since",
            "Status",
            "Actions",
          ].map((head) => (
            <TableHead key={head}>
              <div
                className={`flex items-center gap-1 text-xs font-semibold text-gray-600 ${
                  head === "Actions" ? "justify-end" : ""
                }`}
              >
                {head}

                <ArrowUpDown className="h-3 w-3 opacity-60" />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {employeeData.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.loginAccess}</TableCell>
            <TableCell>{employee.assignSince}</TableCell>

            <TableCell>{employee.status}</TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <EditEmployeeDialog
                  selectedEmployee={selectedEmployee}
                  handleOpenEditDialog={handleOpenEditDialog}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
