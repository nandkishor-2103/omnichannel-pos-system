import { AlignJustify } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { useSidebar } from "@/context/hook/useSidebar";

export default function POSHeader() {
  const { setSidebarOpen } = useSidebar();

  return (
    <div className="bg-card border-b px-4 py-1">
      <div className="flex items-center justify-between">
        <Button size="icon" variant="default" onClick={() => setSidebarOpen(true)}>
          <AlignJustify />
        </Button>

        <div>
          <h1 className="text-2xl font-bold">POS Terminal</h1>

          <p className="text-sm text-muted-foreground">Create new order</p>
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
