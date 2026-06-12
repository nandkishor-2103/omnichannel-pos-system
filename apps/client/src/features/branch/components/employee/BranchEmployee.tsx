import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeTable from "./EmployeeTable";
import { useEffect } from "react";
import { findBranchEmployees } from "@/app/store/employee/employeeThunk";

export default function BranchEmployee() {
  const dispatch = useAppDispatch();
  const branch = useAppSelector((state) => state.branch.branch);

  useEffect(() => {
    if (branch?._id) {
      dispatch(findBranchEmployees({ branchId: branch?._id }));
    }
  }, [dispatch, branch?._id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>

        <AddEmployeeDialog />
      </div>

      <EmployeeTable />
    </div>
  );
}
