import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Calendar, FileText, TrendingUp, Users } from "lucide-react";
import SalesChart from "../dashboard/SalesChart";
import PaymentMethodsChart from "./PaymentMethodsChart";
import TopProducts from "../dashboard/TopProducts";
import CashierPerformance from "../dashboard/CashierPerformance";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <div>
          <Button variant={"outline"} className="cursor-pointer">
            <Calendar />
            Today
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 cursor-pointer"
          >
            <BarChart2 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2 cursor-pointer">
            <TrendingUp className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="cashier" className="flex items-center gap-2 cursor-pointer">
            <Users className="h-4 w-4" />
            Cashier Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SalesChart />
            </div>

            <div>
              <PaymentMethodsChart />
            </div>
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <SalesChart />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <TopProducts />
        </TabsContent>

        {/* Cashier Performance Tab */}
        <TabsContent value="cashier">
          <CashierPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
