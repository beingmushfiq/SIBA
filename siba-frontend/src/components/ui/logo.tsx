import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect } from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  noLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, iconOnly = false, noLink = false, size = 'md' }: LogoProps) {
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    if (!settings.site_name) fetchSettings();
  }, []);

  const sizeClasses = {
    sm: { icon: "w-8 h-8", text: "text-lg", subtext: "text-[7px]" },
    md: { icon: "w-10 h-10", text: "text-xl", subtext: "text-[8px]" },
    lg: { icon: "w-12 h-12 sm:w-14 sm:h-14", text: "text-2xl sm:text-3xl", subtext: "text-[9px] sm:text-[10px]" }
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
        <div className={cn("relative rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 bg-[var(--bg-secondary)] flex items-center justify-center", currentSize.icon)}>
          {settings.site_logo ? (
            <img 
              src={settings.site_logo} 
              alt={settings.site_name || "SIBA"} 
              className="w-full h-full object-contain"
            />
          ) : (
             <div className="w-full h-full bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] flex items-center justify-center text-white font-black text-xl">
               {settings.site_name?.charAt(0) || 'S'}
             </div>
          )}
        </div>
      </div>
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <span className={cn("font-black tracking-tighter leading-none gradient-text transition-transform group-hover:scale-[1.02] origin-left", currentSize.text)}>
            {settings.site_name?.split(' ')[0] || 'SIBA'}
          </span>
          <span className={cn("font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] leading-none mt-1.5 opacity-80 whitespace-nowrap", currentSize.subtext)}>
            {(settings.site_name || 'Sherazi IT Academy').substring(settings.site_name?.split(' ')[0].length + 1)}
          </span>
        </div>
      )}
    </div>
  );

  if (noLink) return content;

  return (
    <Link to="/">
      {content}
    </Link>
  );
}
