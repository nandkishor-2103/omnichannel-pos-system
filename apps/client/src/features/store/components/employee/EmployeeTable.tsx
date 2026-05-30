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
  email: string;
  role: string;
  branch: string;
};

const employeeData: Employee[] = [
  {
    id: 1234,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "Branch Manager",
    branch: "Mumbai Branch",
  },
  {
    id: 2356,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    role: "Cashier",
    branch: "Pune Branch",
  },
  {
    id: 45734,
    name: "Rohan Patil",
    email: "rohan.patil@example.com",
    role: "Inventory Manager",
    branch: "Nashik Branch",
  },
  {
    id: 346468,
    name: "Sneha Joshi",
    email: "sneha.joshi@example.com",
    role: "Store Admin",
    branch: "Thane Branch",
  },
  {
    id: 344647,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    role: "Sales Executive",
    branch: "Nagpur Branch",
  },
  {
    id: 567891,
    name: "Ananya Kulkarni",
    email: "ananya.kulkarni@example.com",
    role: "Cashier",
    branch: "Virar Branch",
  },
  {
    id: 567892,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    role: "Branch Manager",
    branch: "Pune Branch",
  },
  {
    id: 567893,
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    role: "Sales Executive",
    branch: "Mumbai Branch",
  },
  {
    id: 567894,
    name: "Rahul Deshmukh",
    email: "rahul.deshmukh@example.com",
    role: "Inventory Manager",
    branch: "Nashik Branch",
  },
  {
    id: 567895,
    name: "Pooja Nair",
    email: "pooja.nair@example.com",
    role: "Store Admin",
    branch: "Nagpur Branch",
  },
  {
    id: 567896,
    name: "Arjun Patil",
    email: "arjun.patil@example.com",
    role: "Cashier",
    branch: "Virar Branch",
  },
  {
    id: 567897,
    name: "Meera Shah",
    email: "meera.shah@example.com",
    role: "Sales Executive",
    branch: "Mumbai Branch",
  },
  {
    id: 567898,
    name: "Sanjay Rao",
    email: "sanjay.rao@example.com",
    role: "Branch Manager",
    branch: "Thane Branch",
  },
  {
    id: 567899,
    name: "Kavita Yadav",
    email: "kavita.yadav@example.com",
    role: "Inventory Manager",
    branch: "Pune Branch",
  },
  {
    id: 567900,
    name: "Nikhil Joshi",
    email: "nikhil.joshi@example.com",
    role: "Store Admin",
    branch: "Virar Branch",
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
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          {["Name", "Contact", "Role", "Branch", "Actions"].map((head) => (
            <TableHead key={head}>
              <div
                className={`flex items-center gap-1 text-xs font-semibold text-muted-foreground ${
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
            <TableCell className="font-medium">{employee.name}</TableCell>

            <TableCell>{employee.email}</TableCell>

            <TableCell>{employee.role}</TableCell>

            <TableCell>{employee.branch}</TableCell>

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
