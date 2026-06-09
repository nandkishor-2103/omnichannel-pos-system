import { useEffect, type ReactNode } from "react";

import { Clock, ReceiptIcon, RotateCcw, ShoppingCartIcon } from "lucide-react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";

import POSHeader from "../components/Header/POSHeader";

import { SidebarProvider } from "@/context/hook/SidebarProvider";

import { useSidebar } from "@/context/hook/useSidebar";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getStoreById } from "@/app/store/store/storeThunk";
import { getCurrentShiftProgress } from "@/app/store/shiftReport/shiftReportThunk";

type NavItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    path: "/cashier",
    label: "POS Terminal",
    icon: <ShoppingCartIcon size={20} />,
  },

  {
    path: "/cashier/orders",
    label: "Order History",
    icon: <Clock size={20} />,
  },

  {
    path: "/cashier/returns",
    label: "Return/Refund",
    icon: <RotateCcw size={20} />,
  },

  {
    path: "/cashier/shift-summary",
    label: "Shift Summary",
    icon: <ReceiptIcon size={20} />,
  },
];

function LayoutContent() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const storeId = useAppSelector((state) => state.auth.user?.store);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeId) {
      dispatch(getStoreById(storeId));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    if (user?.role === "ROLE_BRANCH_CASHIER") {
      dispatch(getCurrentShiftProgress());
    }
  }, [dispatch, user]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 z-30 h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar navItems={navItems} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN SECTION */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <POSHeader />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function CashierDashboardLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}
