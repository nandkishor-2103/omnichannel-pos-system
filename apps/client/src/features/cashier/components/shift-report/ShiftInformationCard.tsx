import { useEffect, useMemo, useState } from "react";

import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent } from "@/components/ui/card";

export default function ShiftInformationCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const duration = useMemo(() => {
    if (!currentShift) return "--";

    const shiftStart = new Date(currentShift.shiftStart).getTime();

    const shiftEnd = currentShift.shiftEnd
      ? new Date(currentShift.shiftEnd).getTime()
      : now;

    const totalShiftMs = shiftEnd - shiftStart;

    const totalBreakMs =
      currentShift.breaks?.reduce((total, shiftBreak) => {
        const pauseAt = new Date(shiftBreak.pauseAt).getTime();

        const resumeAt = shiftBreak.resumeAt
          ? new Date(shiftBreak.resumeAt).getTime()
          : now;

        return total + (resumeAt - pauseAt);
      }, 0) ?? 0;

    const workingMs = Math.max(0, totalShiftMs - totalBreakMs);

    const hours = Math.floor(workingMs / (1000 * 60 * 60));

    const minutes = Math.floor((workingMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  }, [currentShift, now]);

  const status = currentShift?.status ?? "CLOSED";

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Shift Information</h2>

            <p className="text-xs text-muted-foreground">Current cashier shift details</p>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : status === "PAUSED"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-slate-100 text-slate-700"
            }`}
          >
            {status === "ACTIVE"
              ? "Active Shift"
              : status === "PAUSED"
                ? "Paused Shift"
                : "Shift Closed"}
          </div>
        </div>

        {currentShift ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <span className="text-sm text-muted-foreground">Cashier</span>

              <span className="text-sm font-semibold">{currentShift.cashierName}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <span className="text-sm text-muted-foreground">Shift Start</span>

              <span className="text-sm font-medium">
                {new Date(currentShift.shiftStart).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <span className="text-sm text-muted-foreground">Shift End</span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  currentShift.shiftEnd
                    ? "bg-slate-100 text-slate-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {currentShift.shiftEnd
                  ? new Date(currentShift.shiftEnd).toLocaleString()
                  : "Ongoing"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-primary/5 px-4 py-3">
              <span className="text-sm text-muted-foreground">Working Duration</span>

              <span className="text-sm font-bold text-primary">{duration}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <span className="text-sm text-muted-foreground">Breaks Taken</span>

              <span className="text-sm font-semibold">
                {currentShift.breaks?.length ?? 0}
              </span>
            </div>

            {/* <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
              <span className="text-sm text-muted-foreground">Current Status</span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : status === "PAUSED"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {status}
              </span>
            </div> */}
          </div>
        ) : (
          <div className="rounded-xl border py-8 text-center">
            <p className="text-sm text-muted-foreground">No shift started today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
