import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AlignJustify } from "lucide-react";

export default function POSHeader() {
  return (
    <div className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE */}
        <div>
          <Button>
            <AlignJustify />
          </Button>
        </div>

        {/* MIDDLE */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">POS Terminal</h1>
          <p className="text-sm text-muted-foreground text-center">Create new order</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
