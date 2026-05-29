import BranchInfo from "./BranchInfo";

export default function Setting() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Branch Settings</h1>
      </div>
      <div>
        <BranchInfo />
      </div>
    </div>
  );
}
