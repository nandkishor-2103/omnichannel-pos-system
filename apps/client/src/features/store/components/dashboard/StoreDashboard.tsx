import DashboardState from "./DashboardState";
import RecentSales from "./RecentSales";
import SalesTrends from "./SalesTrends";

export default function StoreDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <DashboardState />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentSales />
        <SalesTrends/>
      </div>
    </div>
  );
}
