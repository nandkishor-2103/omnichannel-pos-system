import BranchSidebar from "@/features/branch/components/sidebar/BranchSidebar.tsx";

import BranchTopbar from "@/features/branch/components/topbar/BranchTopbar.tsx";
import type { ReactNode } from "react";
import { Outlet } from "react-router";

import {
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  UserCircle,
  Users,
} from "lucide-react";

type BranchDetails = {
  name: string;
  address: string;
};

const branch: BranchDetails = {
  name: "Downtown Store",
  address: "123 Main St, Cityville",
};

type NavItem = {
  path: string;
  name: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/branch/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Orders",
    path: "/branch/orders",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    name: "Transactions",
    path: "/branch/transactions",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    name: "Inventory",
    path: "/branch/inventory",
    icon: <Package className="h-5 w-5" />,
  },
  {
    name: "Employees",
    path: "/branch/employees",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Customers",
    path: "/branch/customers",
    icon: <UserCircle className="h-5 w-5" />,
  },
  {
    name: "Reports",
    path: "/branch/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Settings",
    path: "/branch/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function BranchLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <BranchSidebar branch={branch} navItems={navItems} />

      <div className="flex flex-1 flex-col">
        <BranchTopbar />

        <main className="m-4 flex-1 overflow-y-auto rounded-2xl bg-background p-8 shadow-sm md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
