import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg-primary)]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-[var(--text-secondary)] animate-pulse">
          Initializing SIBA...
        </p>
      </div>
    </div>
  );
}
