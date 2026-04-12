import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: string;
  color?: string;
  index?: number;
}

export function StatCard({ label, value, change, icon, color = "var(--brand-500)", index = 0 }: StatCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Activity;
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn("stat-card animate-slide-in-up")}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold",
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
      <p className="text-sm text-[var(--text-muted)] mt-1">{label}</p>
    </div>
  );
}
