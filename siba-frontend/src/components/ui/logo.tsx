import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20">
          <img 
            src="/logo.svg" 
            alt="SIBA Icon" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter leading-none gradient-text">SIBA</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] leading-none mt-1">
            Sherazi IT Academy
          </span>
        </div>
      )}
    </Link>
  );
}
