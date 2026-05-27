import BranchSidebar from "@/features/branch/components/sidebar/BranchSidebar.tsx";

import BranchTopbar from "@/features/branch/components/topbar/BranchTopbar.tsx";

import { Outlet } from "react-router";

export default function BranchLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <BranchSidebar />

      <div className="flex flex-1 flex-col">
        <BranchTopbar />

        <main className="m-4 flex-1 overflow-y-auto rounded-2xl bg-background p-8 shadow-sm md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
