import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { useEffect, type ReactNode } from "react";
import { LayoutDashboard, LogOutIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { logout } from "@/app/store/auth/authThunk";
import { getBranchById } from "@/app/store/branch/branchThunk";

type NavItem = {
  path: string;
  name: string;
  icon: ReactNode;
};

type BranchSidebarProps = {
  navItems: NavItem[];
};

export default function BranchSidebar({ navItems }: BranchSidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const branch = useAppSelector((state) => state.branch.branch);

  useEffect(() => {
    if (user?.branch?.id) {
      dispatch(getBranchById(user.branch.id));
    }
  }, [dispatch, user?.branch?.id]);

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      navigate("/login", { replace: true });
    }
  };

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
      {user?.branch?.id && (
        <div className="mx-2 my-4 rounded-xl bg-sidebar-accent px-4 py-3">
          <h3 className="text-sm font-semibold text-sidebar-accent-foreground">
            {branch?.store?.brand}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {branch?.store?.contact.address}
          </p>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-1">
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
        <Button
          onClick={handleLogout}
          className="h-11 w-full cursor-pointer rounded-xl"
          variant="default"
        >
          <LogOutIcon className="h-4 w-4" />

          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
