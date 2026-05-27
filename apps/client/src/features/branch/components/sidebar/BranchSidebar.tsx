import type { ReactNode } from "react";

import { NavLink } from "react-router-dom";

import {
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOutIcon,
  Package,
  Settings,
  ShoppingBag,
  UserCircle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";

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

type BranchDetails = {
  name: string;
  address: string;
};

const branch: BranchDetails = {
  name: "Downtown Store",
  address: "123 Main St, Cityville",
};

export default function BranchSidebar() {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-border/60 bg-sidebar px-2 shadow-xl">
      {/* TOP SECTION */}
      <div className="flex items-center border-b border-border/60 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <LayoutDashboard size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide text-sidebar-foreground">
              POS SYSTEM
            </h1>
          </div>
        </div>
      </div>

      {/* BRANCH DETAILS */}
      {branch && (
        <div className="mx-2 my-4 rounded-xl bg-sidebar-accent px-4 py-3">
          <h3 className="text-sm font-semibold text-sidebar-accent-foreground">
            {branch.name}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {branch.address}
          </p>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/branch/dashboard"}
              className={({ isActive }) =>
                `
                  group flex items-center gap-4 rounded-xl px-4 py-3
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1"
                  }
                `
              }
            >
              <div className="flex items-center justify-center">{item.icon}</div>

              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* FOOTER */}
      <div className="border-t border-border/60 p-4">
        <Button className="h-11 w-full cursor-pointer rounded-xl" variant="default">
          <LogOutIcon className="h-4 w-4" />

          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
