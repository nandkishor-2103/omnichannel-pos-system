import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, EyeOff } from "lucide-react";

import { useFormik } from "formik";

import type { EmployeeFormValues } from "../../types/employee";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { createBranchEmployee, updateEmployee } from "@/app/store/employee/employeeThunk";

type EmployeeFormProps = {
  initialData?: EmployeeFormValues;
  roles: string[];
  onSuccess?: () => void;
};

export default function BranchEmployeeForm({
  initialData,
  roles,
  onSuccess,
}: EmployeeFormProps) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const branch = useAppSelector((state) => state.branch.branch);

  const formik = useFormik<EmployeeFormValues>({
    enableReinitialize: true,

    initialValues: initialData || {
      employeeId: "",
      fullName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      branchId: "",
    },

    onSubmit: async (values) => {
      // EDIT EMPLOYEE
      if (values.employeeId) {
        const result = await dispatch(
          updateEmployee({
            employeeId: values.employeeId,
            employeeDetails: {
              fullName: values.fullName,
              email: values.email,
              password: values.password,
              phone: values.phone,
              role: values.role,
            },
          })
        );

        if (updateEmployee.fulfilled.match(result)) {
          onSuccess?.();
        }

        return;
      }

      // CREATE EMPLOYEE
      if (branch?._id) {
        const result = await dispatch(
          createBranchEmployee({
            employee: values,
            branchId: branch._id,
          })
        );

        if (createBranchEmployee.fulfilled.match(result)) {
          formik.resetForm();
          onSuccess?.();
        }
      }
    },
  });

  return (
    <form
      autoComplete="new-password"
      onSubmit={formik.handleSubmit}
      className="space-y-5 py-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Full Name</Label>

          <Input
            type="text"
            autoComplete="off"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            placeholder="John Doe"
            className="h-11"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Phone Number</Label>

          <Input
            type="tel"
            autoComplete="off"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="+91 9876543210"
            className="h-11"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Email Address</Label>

        <Input
          type="email"
          autoComplete="off"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="john@example.com"
          className="h-11"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Password</Label>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter secure password"
            className="h-11 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Employee Role</Label>

        <Select
          value={formik.values.role}
          onValueChange={(value) => formik.setFieldValue("role", value)}
        >
          <SelectTrigger className="w-full h-11">
            <SelectValue placeholder="Select employee role" />
          </SelectTrigger>

          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button type="submit" className="w-full h-11 text-sm font-medium cursor-pointer">
          {initialData ? "Save Changes" : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}
