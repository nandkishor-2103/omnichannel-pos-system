import { Outlet } from "react-router";
import StoreTopbar from "../store-topbar/StoreTopbar";
import BranchSidebar from "@/features/branch/components/sidebar/BranchSidebar";
import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  BarChart2,
//   CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Truck,
  Users,
} from "lucide-react";

type NavLinks = {
  path: string;
  name: string;
  icon: ReactNode;
};

const navLinks: NavLinks[] = [
  {
    path: "/store/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
//   {
//     path: "/store/stores",
//     name: "Stores",
//     icon: <Store className="w-5 h-5" />,
//   },
  {
    path: "/store/branches",
    name: "Branches",
    icon: <Store className="w-5 h-5" />,
  },
  {
    path: "/store/products",
    name: "Products",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    path: "/store/categories",
    name: "Categories",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    path: "/store/employees",
    name: "Employees",
    icon: <Users className="w-5 h-5" />,
  },
//   {
//     path: "/store/alerts",
//     name: "Alerts",
//     icon: <Truck className="w-5 h-5" />,
//   },
  {
    path: "/store/sales",
    name: "Sales",
    icon: <BarChart2 className="w-5 h-5" />,
  },
//   {
//     path: "/store/transactions",
//     name: "Transactions",
//     icon: <CreditCard className="w-5 h-5" />,
//   },
  {
    path: "/store/reports",
    name: "Reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    path: "/store/upgrade",
    name: "Upgrade Plan",
    icon: <BadgeDollarSign className="w-5 h-5" />,
  },
  {
    path: "/store/settings",
    name: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function StoreDashboardLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <BranchSidebar navItems={navLinks} />
      <div className="flex flex-1 flex-col">
        <StoreTopbar />
        <main className="m-4 flex-1 overflow-y-auto rounded-2xl bg-background p-8 shadow-sm md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
