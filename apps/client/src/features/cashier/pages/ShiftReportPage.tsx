import PaymentSummaryCard from "../components/shift-report/PaymentSummaryCard";
import RecentOrderTableCard from "../components/shift-report/RecentOrderTableCard";
import RefundsTableCard from "../components/shift-report/RefundsTableCard";
import SalesSummaryCard from "../components/shift-report/SalesSummaryCard";
import ShiftInformationCard from "../components/shift-report/ShiftInformationCard";
import ShiftReportHeader from "../components/shift-report/ShiftReportHeader";
import TopSellingItemsCard from "../components/shift-report/TopSellingItemsCard";

export default function ShiftReportPage() {
  return (
    <div className="h-full flex flex-col">
      <ShiftReportHeader />
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ShiftInformationCard />
          <SalesSummaryCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PaymentSummaryCard />
          <TopSellingItemsCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <RecentOrderTableCard />
          <RefundsTableCard />
        </div>
      </div>
    </div>
  );
}
