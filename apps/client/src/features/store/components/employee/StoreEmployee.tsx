import AddEmployeeDialog from "./AddEmployeeDialog";
import EmployeeTable from "./EmployeeTable";

export default function StoreEmployee() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Employee Management</h1>

        <AddEmployeeDialog />
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <EmployeeTable />
      </div>
    </div>
  );
}
