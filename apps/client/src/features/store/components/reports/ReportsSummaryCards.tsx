import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  totalSales: number;
  totalCategories: number;
  totalBranches: number;
};

export default function ReportsSummaryCards({
  totalSales,
  totalCategories,
  totalBranches,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">₹{totalSales.toLocaleString("en-IN")}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Categories Sold</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{totalCategories}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Active Branches</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">{totalBranches}</div>
        </CardContent>
      </Card>
    </div>
  );
}
