import { Card, CardContent } from "@/components/ui/card";

export type shiftData = {
  cashier: {
    fullName: string;
    shiftStartTime: string;
    shiftEndTime: string;
    duration: string;
  };
};
const shiftData: shiftData = {
  cashier: {
    fullName: "John Doe",
    shiftStartTime: "June 1, 2023 09:00 AM",
    shiftEndTime: "",
    duration: "8 hours",
  },
};

export default function ShiftInformationCard() {
  return (
    // <Card>
    //   <CardContent>
    //     <h2 className="text-xl font-semibold mb-4">Shift Information</h2>

    //     <div className="space-y-2 mb-1">
    //       <div className="flex justify-between">
    //         <span className="text-muted-foreground">Cashier:</span>
    //         <span className="font-medium">{shiftData.cashier.fullName}</span>
    //       </div>
    //     </div>

    //     <div className="space-y-2 mb-1">
    //       <div className="flex justify-between">
    //         <span className="text-muted-foreground">Shift Start:</span>
    //         <span className="font-medium">{shiftData.cashier.shiftStartTime}</span>
    //       </div>
    //     </div>

    //     <div className="space-y-2 mb-1">
    //       <div className="flex justify-between">
    //         <span className="text-muted-foreground">Shift End:</span>
    //         <span className="font-medium">
    //           {shiftData.cashier.shiftEndTime
    //             ? shiftData.cashier.shiftEndTime
    //             : "ongoing"}
    //         </span>
    //       </div>
    //     </div>

    //     <div className="space-y-2">
    //       <div className="flex justify-between">
    //         <span className="text-muted-foreground">Duration:</span>
    //         <span className="font-medium">{shiftData.cashier.duration}</span>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>

    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-4">
        {/* Dynamic Status */}
        {(() => {
          const isShiftActive = !shiftData.cashier.shiftEndTime;

          return (
            <>
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Shift Information</h2>

                  <p className="text-xs text-muted-foreground">
                    Current cashier shift details
                  </p>
                </div>

                <div
                  className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${
                  isShiftActive
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-foreground"
                }
              `}
                >
                  {isShiftActive ? "Active Shift" : "Shift Closed"}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {/* Cashier */}
                <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Cashier</span>

                  <span className="text-sm font-semibold">
                    {shiftData.cashier.fullName}
                  </span>
                </div>

                {/* Shift Start */}
                <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Shift Start</span>

                  <span className="text-sm font-medium">
                    {shiftData.cashier.shiftStartTime}
                  </span>
                </div>

                {/* Shift End */}
                <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Shift End</span>

                  <span
                    className={`
                  rounded-full
                  px-2
                  py-1
                  text-xs
                  font-medium
                  ${
                    isShiftActive
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-muted text-foreground"
                  }
                `}
                  >
                    {shiftData.cashier.shiftEndTime || "Ongoing"}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between rounded-xl border bg-primary/5 px-4 py-3">
                  <span className="text-sm text-muted-foreground">Duration</span>

                  <span className="text-sm font-bold text-primary">
                    {shiftData.cashier.duration}
                  </span>
                </div>
              </div>
            </>
          );
        })()}
      </CardContent>
    </Card>
  );
}
