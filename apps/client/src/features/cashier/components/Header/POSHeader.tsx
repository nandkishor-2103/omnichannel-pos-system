import { useEffect, useState } from "react";
import { AlignJustify, Clock } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useSidebar } from "@/context/hook/useSidebar";
import { useAppSelector } from "@/app/store/hooks";

export default function POSHeader() {
  const { setSidebarOpen } = useSidebar();

  const userProfile = useAppSelector((state) => state.user.userProfile);

  const storeName = useAppSelector((state) => state.store.store?.brand);

  const fallbackInitials = userProfile?.fullName
    ? userProfile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const avatarUrl = userProfile?.fullName
    ? `https://api.dicebear.com/10.x/notionists/svg?backgroundColor=FFA500,0b0385&seed=${encodeURIComponent(
        userProfile.fullName
      )}`
    : undefined;

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative flex items-center justify-between border-b border-border/60 bg-background/95 px-6 py-1 shadow-sm backdrop-blur">
      {/* Left */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setSidebarOpen(true)}
        className="cursor-pointer shrink-0"
      >
        <AlignJustify className="h-5 w-5" />
      </Button>

      {/* Center */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-6 rounded-2xl border bg-card px-6  shadow-sm">
          {/* Time */}
          <div className="flex items-center gap-2 border-r pr-6">
            <Clock className="h-4 w-4 text-primary" />

            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Local Time
              </p>

              <p className="text-sm font-semibold">{currentTime}</p>
            </div>
          </div>

          {/* Store */}
          <div className="border-r pr-6 text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Store
            </p>

            <h2 className="text-base font-bold">{storeName || "Unknown"}</h2>

            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* POS Terminal */}
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Terminal
            </p>

            <h2 className="text-base font-bold">POS Terminal</h2>

            <p className="text-xs text-muted-foreground">Create New Order</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 rounded-2xl border bg-card px-3 py-2 shadow-sm transition-all hover:shadow-md cursor-pointer">
        <Avatar className="h-10 w-10 border border-primary ">
          <AvatarImage src={avatarUrl} alt={userProfile?.fullName} />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>

        <div className="hidden md:block">
          <p className="text-sm font-semibold text-foreground">{userProfile?.fullName}</p>

          <p className="text-xs text-muted-foreground">{userProfile?.email}</p>
        </div>
      </div>
    </header>
  );
}
