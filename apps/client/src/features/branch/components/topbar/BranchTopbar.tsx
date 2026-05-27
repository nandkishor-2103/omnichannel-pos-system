import { Button } from "@/components/ui/button.tsx";

import { Bell, UserIcon } from "lucide-react";

type BranchDetails = {
  name: string;
  address: string;
};

type UserProfile = {
  name: string;
  email: string;
};

const branch: BranchDetails = {
  name: "Downtown Store",
  address: "123 Main St, Cityville",
};

const userProfile: UserProfile = {
  name: "John Doe",
  email: "johndoe@gmail.com",
};

export default function BranchTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background px-6 py-3 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold tracking-wide text-foreground">
          {branch ? branch.name : "Branch Dashboard"}
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

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-sidebar-accent"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-sidebar-accent">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-foreground">{userProfile.name}</p>

            <p className="text-xs text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
