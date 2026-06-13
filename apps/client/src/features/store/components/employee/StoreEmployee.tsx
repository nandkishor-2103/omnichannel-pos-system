import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeTable from "./EmployeeTable";
import { useEffect } from "react";
import { findStoreEmployees } from "@/app/store/employee/employeeThunk";

export default function BranchEmployee() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(findStoreEmployees(user.store.id));
    }
  }, [dispatch, user]);

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
