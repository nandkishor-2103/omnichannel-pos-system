import { Outlet } from "react-router";
import BranchSidebar from "@/features/branch/components/sidebar/BranchSidebar";
import type { ReactNode } from "react";
import { Clock, FileText, LayoutDashboard, Settings, Store } from "lucide-react";
import SuperAdminTopbar from "./SuperAdminTopbar";

type NavLinks = {
  path: string;
  name: string;
  icon: ReactNode;
};

const navLinks: NavLinks[] = [
  {
    name: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "/super-admin/stores",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Subscription Plans",
    path: "/super-admin/subscriptions",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Pending Requests",
    path: "/super-admin/requests",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/super-admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <BranchSidebar navItems={navLinks} />
      <div className="flex flex-1 flex-col">
        <SuperAdminTopbar />
        <main className="m-4 flex-1 overflow-y-auto rounded-2xl bg-background p-8 shadow-sm md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
