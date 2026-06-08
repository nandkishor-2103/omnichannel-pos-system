import { useEffect, type ReactNode } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { LayoutDashboard, X, LogOutIcon, MapPin, Store, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { logout } from "@/app/store/auth/authThunk";
import { toast } from "sonner";
import { getBranchById } from "@/app/store/branch/branchThunk";

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

  const userProfile = useAppSelector((state) => state.user.userProfile);
  const branch = useAppSelector((state) => state.branch.branch);

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {

      navigate("/login", { replace: true });
    } else {
      toast.error((resultAction.payload as string) || "Failed to logout");
    }
  };

  useEffect(() => {
    const branchId = userProfile?.branch;

    if (!branchId) return;

    dispatch(getBranchById(branchId));
  }, [dispatch, userProfile?.branch]);

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

      {/* BRANCH INFO */}
      <div className="border-b border-border/60 p-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-sidebar-foreground">
                {branch?.name || "Branch"}
              </h3>

              <p className="text-xs font-medium text-primary">
                {branch?.store?.brand || "Store"}
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />

                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {branch?.address || "Address not available"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />

                  <p className="text-xs text-muted-foreground">
                    {branch?.openTime && branch?.closeTime
                      ? `${new Date(`2000-01-01T${branch.openTime}`).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )} - ${new Date(
                          `2000-01-01T${branch.closeTime}`
                        ).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : "Business Hours"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
