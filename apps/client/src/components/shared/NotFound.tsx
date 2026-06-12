import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Decorative Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
          <SearchX className="h-10 w-10 text-slate-700" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black tracking-tight text-slate-900">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-800">Page Not Found</h2>

        <p className="mt-4 text-lg text-slate-600">
          The page you're looking for doesn't exist, may have been moved, or the URL might
          be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={() => navigate("/")} className="min-w-40">
            <Home className="mr-2 h-4 w-4 cursor-pointer" />
            Go Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(-1)}
            className="min-w-40 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Footer Card */}
        <div className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            POS System • Smart Inventory • Orders • Analytics
          </p>

          <p className="mt-2 text-sm text-slate-400">
            If you believe this is an error, please contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
