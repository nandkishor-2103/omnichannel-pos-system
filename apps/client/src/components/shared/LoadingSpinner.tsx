import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export default function LoadingSpinner({ size = 18, text }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-8 w-8 animate-ping rounded-full bg-primary/20" />

        <Loader2 size={size} className="relative animate-spin text-current shrink-0" />
      </div>

      {text && <span className="text-sm font-medium text-muted-foreground">{text}</span>}
    </div>
  );
}

// Usage example:

/* <Button
  type="submit"
  disabled={loading}
  className="h-11 w-full cursor-pointer font-medium disabled:opacity-100 disabled:cursor-not-allowed"
>
  {loading ? (
    <LoadingSpinner size={16} text="Signing In..." />
  ) : (
    "Sign In"
  )}
</Button> */
