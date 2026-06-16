import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getStoreOverview } from "@/app/store/storeAnalytics/storeAnalyticsThunk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button.tsx";

import { Bell } from "lucide-react";
import { useEffect } from "react";

export default function SuperAdminTopbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const fallbackInitials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const avatarUrl = user?.fullName
    ? `https://api.dicebear.com/10.x/notionists/svg?backgroundColor=FFA500,0b0385&seed=${encodeURIComponent(
        user.fullName
      )}`
    : undefined;

  const roleLabel =
    user?.role?.replace("ROLE_", "SYSTEM ").replaceAll("_", " ").toUpperCase() ?? "";

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getStoreOverview(user.store.id));
    }
  }, [dispatch, user?.store?.id]);

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background px-6 py-3 shadow-sm">
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold tracking-wide text-foreground">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center">
        <div className="rounded-full border bg-muted px-4 py-2 text-sm font-semibold tracking-wide">
          {roleLabel}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        {/* <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <Bell className="h-4 w-4" />
        </Button> */}

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2 shadow-sm">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={avatarUrl} alt={user?.fullName} />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>

          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-none">{user?.fullName}</p>

            <p className="mt-1 text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
