import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand-600)]/20 text-[var(--brand-300)] border border-[var(--brand-600)]/30",
        secondary: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-primary)]",
        success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        danger: "bg-red-500/15 text-red-400 border border-red-500/30",
        info: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
        outline: "text-[var(--text-secondary)] border border-[var(--border-primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
