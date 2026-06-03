import StoreRegistrationChart from "./chart/StoreRegistrationChart";
import StoreStatusChart from "./chart/StoreStatusChart";
import SuperAdminOverview from "./SuperAdminOverview";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>

        <p className="mt-1 text-muted-foreground">
          Monitor stores, registrations, approvals and overall system health.
        </p>
      </div>

      <SuperAdminOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <StoreRegistrationChart />
        <StoreStatusChart />
      </div>
    </div>
  );
}
