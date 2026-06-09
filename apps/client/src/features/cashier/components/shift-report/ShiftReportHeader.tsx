import { useState } from "react";

import {
  CheckCircle2,
  CircleOff,
  LogOutIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  PlayIcon,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  startShift,
  endShift,
  pauseShift,
  resumeShift,
} from "@/app/store/shiftReport/shiftReportThunk";

export default function ShiftReportHeader() {
  const dispatch = useAppDispatch();

  const [actionLoading, setActionLoading] = useState(false);

  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const branchId = useAppSelector((state) => state.auth.user?.branch);

  const shiftStatus = currentShift?.status ?? "CLOSED";

  const isActive = shiftStatus === "ACTIVE";
  const isPaused = shiftStatus === "PAUSED";
  const isClosed = shiftStatus === "CLOSED";

  const handleStartShift = async () => {
    if (!branchId) {
      toast.error("Branch not found");
      return;
    }

    try {
      setActionLoading(true);

      await dispatch(startShift(branchId)).unwrap();
    } finally {
      setActionLoading(false);
    }
  };

  const handlePauseShift = async () => {
    try {
      setActionLoading(true);

      await dispatch(pauseShift()).unwrap();
    } finally {
      setActionLoading(false);
    }
  };

  const handleResumeShift = async () => {
    try {
      setActionLoading(true);

      await dispatch(resumeShift()).unwrap();
    } finally {
      setActionLoading(false);
    }
  };

  const handleEndShift = async () => {
    try {
      setActionLoading(true);

      await dispatch(endShift()).unwrap();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="border-b bg-card px-4 py-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shift Report</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor cashier activity, sales, refunds and shift performance
          </p>
        </div>

        {/* Center Section */}
        {currentShift && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border bg-muted/30 px-4 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Started
              </p>

              <p className="font-semibold">
                {new Date(currentShift.shiftStart).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="min-w-[90px] rounded-lg border bg-muted/30 px-4 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Orders
              </p>

              <p className="font-semibold">{currentShift.totalOrders}</p>
            </div>

            <div className="min-w-[120px] rounded-lg border bg-muted/30 px-4 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Sales
              </p>

              <p className="font-semibold text-green-600">
                ₹{currentShift.totalSales.toFixed(2)}
              </p>
            </div>

            <div className="min-w-[120px] rounded-lg border bg-muted/30 px-4 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Refunds
              </p>

              <p className="font-semibold text-red-600">
                ₹{currentShift.totalRefunds.toFixed(2)}
              </p>
            </div>

            <div className="min-w-[120px] rounded-lg border bg-muted/30 px-4 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Net Sales
              </p>

              <p className="font-semibold text-primary">
                ₹{currentShift.netSales.toFixed(2)}
              </p>
            </div>

            {isPaused && currentShift.breaks && currentShift.breaks.length > 0 && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2">
                <p className="text-[11px] uppercase tracking-wide text-yellow-700">
                  Break Started
                </p>

                <p className="font-semibold text-yellow-800">
                  {new Date(
                    currentShift.breaks[currentShift.breaks.length - 1].pauseAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div
            className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm sm:flex ${
              isActive
                ? "border-green-200 bg-green-50 text-green-700"
                : isPaused
                  ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                  : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {isActive ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : isPaused ? (
              <PauseCircleIcon className="h-4 w-4" />
            ) : (
              <CircleOff className="h-4 w-4" />
            )}

            {isActive ? "Shift Active" : isPaused ? "Shift Paused" : "Shift Closed"}
          </div>

          {isClosed && (
            <Button
              onClick={handleStartShift}
              disabled={actionLoading}
              className="cursor-pointer gap-2 rounded-xl px-5"
            >
              <PlayCircleIcon className="h-4 w-4" />
              Start Shift
            </Button>
          )}

          {isActive && (
            <>
              <Button
                variant="outline"
                onClick={handlePauseShift}
                disabled={actionLoading}
                className="cursor-pointer gap-2 rounded-xl px-5"
              >
                <PauseCircleIcon className="h-4 w-4" />
                Pause Shift
              </Button>

              <Button
                variant="destructive"
                onClick={handleEndShift}
                disabled={actionLoading}
                className="cursor-pointer gap-2 rounded-xl px-5"
              >
                <LogOutIcon className="h-4 w-4" />
                End Shift
              </Button>
            </>
          )}

          {isPaused && (
            <>
              <Button
                onClick={handleResumeShift}
                disabled={actionLoading}
                className="cursor-pointer gap-2 rounded-xl px-5"
              >
                <PlayIcon className="h-4 w-4" />
                Resume Shift
              </Button>

              <Button
                variant="destructive"
                disabled
                className="cursor-not-allowed gap-2 rounded-xl px-5 opacity-50"
                title="Resume shift before ending"
              >
                <LogOutIcon className="h-4 w-4" />
                End Shift
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
