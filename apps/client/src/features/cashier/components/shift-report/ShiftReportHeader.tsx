import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

type ShiftData = {
  cashier: {
    shiftEndTime: string;
  };
};

const shiftData: ShiftData = {
  cashier: {
    shiftEndTime: "",
  },
};

export default function ShiftReportHeader() {
  const isShiftActive = !shiftData.cashier.shiftEndTime;

  return (
    <div className="border-b bg-card px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shift Report</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor cashier activity, sales, refunds, and shift performance
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Dynamic Shift Status */}
          <div
            className={`
              hidden
              rounded-full
              px-3
              py-1
              text-xs
              font-medium
              sm:flex
              ${
                isShiftActive
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            {isShiftActive ? "Shift Active" : "Shift Closed"}
          </div>

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="
              cursor-pointer
              gap-2
              rounded-xl
              px-5
              shadow-sm
              transition
              hover:scale-[1.02]
            "
          >
            <LogOutIcon className="h-4 w-4" />
            End Shift & Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
