import { useEffect, useState } from "react";
import {
  Loader2,
  Store,
  Server,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface BackendWakeupScreenProps {
  connected: boolean;
}

export default function BackendWakeupScreen({
  connected,
}: BackendWakeupScreenProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />

        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              {!connected && (
                <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
              )}

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-50 shadow-md">
                {connected ? (
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                ) : (
                  <Store className="h-12 w-12 text-green-600" />
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              {connected ? "Backend Connected" : "Starting POS System"}
            </h1>

            <p className="mt-3 text-slate-600">
              {connected
                ? "Everything is ready. Redirecting to your workspace..."
                : "Preparing your workspace and connecting backend services."}
            </p>
          </div>

          {/* Timer */}
          {!connected && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />

                <span className="text-sm font-medium text-slate-700">
                  Wake-up Time
                </span>
              </div>

              <div className="mt-3 text-center">
                <span className="text-5xl font-bold text-green-600">
                  {elapsedTime}s
                </span>

                <p className="mt-2 text-sm text-slate-500">
                  Elapsed time
                </p>
              </div>
            </div>
          )}

          {/* Progress */}
          {!connected && (
            <div className="mt-8">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>Connecting backend</span>
                <span>Please wait...</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
              </div>
            </div>
          )}

          {/* Status */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {connected ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />

                <span className="font-medium text-green-600">
                  Redirecting...
                </span>
              </>
            ) : (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-green-600" />

                <span className="font-medium text-green-600">
                  Waking up backend server...
                </span>
              </>
            )}
          </div>

          {/* Information */}
          {!connected && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex gap-3">
                <Server className="mt-0.5 h-5 w-5 text-green-600" />

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Why does this happen?
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    This application is hosted on Render's free tier.
                    Inactive services automatically sleep after 15 minutes
                    without traffic.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    When a new request arrives, the backend wakes up again.
                    This usually takes around 30–60 seconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-slate-400">
              Loading Inventory • Orders • Customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
