import { useEffect, type ReactNode } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import StoreTopbar from "../store-topbar/StoreTopbar";

import BranchSidebar from "@/features/branch/components/sidebar/BranchSidebar";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { getCurrentSubscription } from "@/app/store/store-subscription/storeSubscriptionThunk";

import {
  BadgeDollarSign,
  BarChart2,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Store,
  Tag,
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
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    path: "/store/branches",
    name: "Branches",
    icon: <Store className="h-5 w-5" />,
  },
  {
    path: "/store/products",
    name: "Products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    path: "/store/categories",
    name: "Categories",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    path: "/store/employees",
    name: "Employees",
    icon: <Users className="h-5 w-5" />,
  },
  {
    path: "/store/sales",
    name: "Sales",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    path: "/store/reports",
    name: "Reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    path: "/store/upgrade",
    name: "Upgrade Plan",
    icon: <BadgeDollarSign className="h-5 w-5" />,
  },
  {
    path: "/store/settings",
    name: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function StoreDashboardLayout() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { currentSubscription } = useAppSelector((state) => state.storeSubscription);

  useEffect(() => {
    dispatch(getCurrentSubscription());
  }, [dispatch]);

  const hasActiveSubscription =
    currentSubscription &&
    currentSubscription.status === "ACTIVE" &&
    new Date(currentSubscription.endDate) > new Date();

  const filteredNavLinks = hasActiveSubscription
    ? navLinks
    : navLinks.filter((item) => item.path === "/store/upgrade");

  useEffect(() => {
    if (!hasActiveSubscription && location.pathname !== "/store/upgrade") {
      navigate("/store/upgrade", {
        replace: true,
      });
    }
  }, [hasActiveSubscription, location.pathname, navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <BranchSidebar navItems={filteredNavLinks} />

      <div className="flex flex-1 flex-col">
        <StoreTopbar />

        <main className="m-4 flex-1 overflow-y-auto rounded-2xl bg-background p-8 shadow-sm md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
