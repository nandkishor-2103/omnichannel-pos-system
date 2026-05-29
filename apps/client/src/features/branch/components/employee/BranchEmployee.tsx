import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeState from "./EmployeeState";
import EmployeeTable from "./EmployeeTable";

export default function BranchEmployee() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>

        <AddEmployeeDialog />
      </div>

      <EmployeeState />
      <EmployeeTable />
    </div>
  );
}
