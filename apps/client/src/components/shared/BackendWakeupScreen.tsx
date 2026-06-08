import { Loader2, Store, Wifi } from "lucide-react";

export default function BackendWakeupScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-emerald-500/10 blur-3xl [animation-delay:1s]" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-green-400/5 blur-3xl [animation-delay:2s]" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-20" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                <Store className="h-12 w-12 text-green-400" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">POS System</h1>

            <p className="mt-2 text-sm text-slate-400">Initializing business services</p>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>Connecting Backend</span>
              <span>Please wait...</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 flex items-center justify-center gap-3 text-green-400">
            <Loader2 className="h-5 w-5 animate-spin" />

            <span className="text-sm font-medium">Waking up backend server...</span>
          </div>

          {/* Info */}
          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start gap-3">
              <Wifi className="mt-0.5 h-4 w-4 text-green-400" />

              <p className="text-xs leading-relaxed text-slate-400">
                First request may take a few seconds because the server is starting from
                sleep mode.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs tracking-widest text-slate-500 uppercase">
              Powered by Infotact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
