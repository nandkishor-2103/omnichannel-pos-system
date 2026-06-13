import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

import EditEmployeeDialog from "./EditEmployeeDialog";
import {
  enableEmployee,
  disableEmployee,
  deleteEmployee,
} from "@/app/store/employee/employeeThunk";

import type { Employee } from "@/app/store/employee/employeeTypes";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal, UserX, UserCheck, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { EmployeeFormValues } from "../../types/employee";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

const formatRole = (role: string) =>
  role
    .replace("ROLE_", "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function EmployeeTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormValues>();

  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: "enable" | "disable" | "delete" | null;
    employee: Employee | null;
  }>({
    open: false,
    type: null,
    employee: null,
  });

  const dispatch = useAppDispatch();

  const employees = useAppSelector((state) => state.employee.employees);

  const user = useAppSelector((state) => state.auth.user);

  const filteredEmployees =
    user?.role === "ROLE_BRANCH_MANAGER"
      ? employees.filter((employee) => employee.role !== "ROLE_BRANCH_ADMIN")
      : employees;

  const handleOpenEditDialog = (employee: (typeof employees)[number]) => {
    setSelectedEmployee({
      employeeId: employee._id,
      fullName: employee.fullName,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      password: "",
      branchId: employee.branch?._id ?? "",
    });
  };

  const handleConfirmAction = async () => {
    if (!actionDialog.employee || !actionDialog.type) {
      return;
    }

    try {
      switch (actionDialog.type) {
        case "enable":
          await dispatch(enableEmployee(actionDialog.employee._id)).unwrap();
          break;

        case "disable":
          await dispatch(disableEmployee(actionDialog.employee._id)).unwrap();
          break;

        case "delete":
          await dispatch(deleteEmployee(actionDialog.employee._id)).unwrap();
          break;
      }
    } finally {
      setActionDialog({
        open: false,
        type: null,
        employee: null,
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-background">
      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              {[
                "Employee",
                "Role",
                "Email",
                "Phone",
                "Login Access",
                "Assigned Since",
                "Actions",
              ].map((head) => (
                <TableHead key={head}>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${
                      head === "Actions" ? "justify-end" : ""
                    }`}
                  >
                    {head}
                    {head !== "Actions" && <ArrowUpDown className="h-3 w-3 opacity-60" />}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow
                  key={employee._id}
                  className="group transition-all duration-200 hover:bg-muted/50"
                >
                  {/* Employee */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {employee.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium leading-none">{employee.fullName}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {employee.branch?.name ?? "No Branch Assigned"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <Badge variant="secondary">{formatRole(employee.role)}</Badge>
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    <div className="max-w-[240px] truncate" title={employee.email}>
                      {employee.email}
                    </div>
                  </TableCell>

                  {/* Phone */}
                  <TableCell>{employee.phone}</TableCell>

                  {/* Login Access */}
                  <TableCell>
                    <Badge variant={employee.verified ? "default" : "secondary"}>
                      {employee.verified ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>

                  {/* Assigned Since */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{formatDate(employee.createdAt)}</span>

                      <span className="text-xs text-muted-foreground">Joined</span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {employee.verified ? (
                          <DropdownMenuItem
                            onClick={() =>
                              setActionDialog({
                                open: true,
                                type: "disable",
                                employee,
                              })
                            }
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Disable Employee
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              setActionDialog({
                                open: true,
                                type: "enable",
                                employee,
                              })
                            }
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Enable Employee
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            setActionDialog({
                              open: true,
                              type: "delete",
                              employee,
                            })
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <EditEmployeeDialog
                      selectedEmployee={selectedEmployee}
                      handleOpenEditDialog={() => handleOpenEditDialog(employee)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={actionDialog.open}
        onOpenChange={(open) =>
          setActionDialog((prev) => ({
            ...prev,
            open,
          }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.type === "delete"
                ? "Delete Employee"
                : actionDialog.type === "disable"
                  ? "Disable Employee"
                  : "Enable Employee"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {actionDialog.type === "delete"
                ? `Are you sure you want to delete ${actionDialog.employee?.fullName}? This action cannot be undone.`
                : actionDialog.type === "disable"
                  ? `Are you sure you want to disable ${actionDialog.employee?.fullName}? They won't be able to login.`
                  : `Are you sure you want to enable ${actionDialog.employee?.fullName}? They will regain login access.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleConfirmAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
