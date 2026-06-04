import type { ReactNode } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { LayoutDashboard, X, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/app/store/auth/authThunk";
import { toast } from "sonner";

type NavItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

interface SidebarProps {
  navItems: NavItem[];

  onClose: () => void;
}

export default function Sidebar({ navItems, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } else {
      toast.error((resultAction.payload as string) || "Failed to logout");
    }
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-sidebar shadow-2xl">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
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

        {/* CLOSE BUTTON */}
        <Button
          size="icon"
          variant="outline"
          onClick={onClose}
          className="rounded-full hover:bg-sidebar-accent"
        >
          <X size={20} />
        </Button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `
                group flex items-center gap-4 rounded-xl px-4 py-3
                transition-all duration-200

                ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1"
                }
                `
              }
            >
              <div className="flex items-center justify-center">{item.icon}</div>

              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      {/* FOOTER */}
      <div className="border-t border-border/60 p-4">
        <Button
          className="h-11 w-full cursor-pointer rounded-xl"
          variant="default"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-4 w-4" />

          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
