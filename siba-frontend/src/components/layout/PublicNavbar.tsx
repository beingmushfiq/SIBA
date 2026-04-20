import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, ArrowRight, Home, Zap, BookOpen, Users, Info, GraduationCap, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/store/useAuthStore";

export function PublicNavbar() {
  const { isAuthenticated, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Process", href: "/learning-process", icon: Zap },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Mentors", href: "/mentors", icon: Users },
    { label: "Learners", href: "/learners", icon: GraduationCap },
    { label: "Verification", href: "/verify-certificate", icon: ShieldCheck },
    { label: "About Us", href: "/about", icon: Info },
  ];

  // Priority items for xs screens (max 4 icons + menu)
  const mobileNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Mentors", href: "/mentors", icon: Users },
    { label: "About", href: "/about", icon: Info },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed font-sans transition-all duration-500 z-[9999] pointer-events-auto",
          "bottom-4 inset-x-0 mx-auto w-[calc(100%-1rem)] max-w-[400px]",
          "sm:bottom-6 sm:w-[calc(100%-2rem)] sm:max-w-none",
          "md:inset-x-8 md:mx-0 md:w-auto md:top-6 md:bottom-auto",
          "lg:inset-x-12",
          "h-16 flex items-center px-2 sm:px-4 md:px-6 lg:px-10 rounded-2xl sm:rounded-[1.5rem] glass shadow-2xl safe-bottom",
          scrolled ? "md:top-4 md:inset-x-6 lg:inset-x-24 border-[var(--brand-500)]/20" : "border-white/10"
        )}
      >
        {/* Mobile: xs — show priority 4 items + menu */}
        <div className="flex sm:hidden items-center justify-between w-full h-full">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-1 py-1.5 rounded-xl transition-all active:scale-90",
                  isActive ? "text-[var(--brand-500)]" : "text-[var(--text-muted)] hover:text-[var(--brand-500)]"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5 truncate max-w-[44px] text-center">{item.label}</span>
              </Link>
            );
          })}
          <button 
            className="min-w-[44px] min-h-[44px] flex flex-col items-center justify-center text-[var(--text-primary)] rounded-xl transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 text-[var(--brand-500)]" /> : <Menu className="w-5 h-5" />}
            <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">{isOpen ? "Close" : "Menu"}</span>
          </button>
        </div>

        {/* Tablet: sm-lg — show all items as icon bar */}
        <div className="hidden sm:flex xl:hidden items-center justify-between w-full">
           {navItems.map((item) => {
             const isActive = location.pathname === item.href;
             return (
               <Link
                 key={item.label}
                 to={item.href}
                 className={cn(
                   "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-1.5 py-2 rounded-xl transition-all active:scale-90",
                   isActive ? "text-[var(--brand-500)]" : "text-[var(--text-muted)] hover:text-[var(--brand-500)]"
                 )}
               >
                 <item.icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                 <span className="text-[7px] font-black uppercase tracking-tighter mt-1 truncate max-w-[48px] text-center">{item.label}</span>
               </Link>
             );
           })}
           
           <button 
             className="min-w-[44px] min-h-[44px] flex flex-col items-center justify-center text-[var(--text-primary)] rounded-xl transition-all active:scale-90"
             onClick={() => setIsOpen(!isOpen)}
             aria-label={isOpen ? "Close menu" : "Open menu"}
             aria-expanded={isOpen}
           >
             {isOpen ? <X className="w-5 h-5 text-[var(--brand-500)]" /> : <Menu className="w-5 h-5" />}
             <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{isOpen ? "Close" : "Menu"}</span>
           </button>
        </div>

        {/* Desktop: xl+ */}
        <Logo size="md" className="hidden xl:flex items-center shrink-0 transition-transform active:scale-95" />

        <div className="hidden xl:flex items-center gap-2 ml-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative group truncate",
                  isActive ? "text-[var(--brand-500)]" : "text-[var(--text-secondary)] hover:text-[var(--brand-500)]"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-[var(--brand-500)] rounded-full transition-all duration-300",
                  isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-2 group-hover:opacity-50"
                )} />
              </Link>
            );
          })}
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <Link to={`/dashboard/${user.role.toLowerCase()}`}>
                <Button size="sm" className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shadow-lg transition-all hover:scale-105 active:scale-95 group">
                   Go to Dashboard
                  <LayoutDashboard className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:rotate-12" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-bold text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shadow-lg transition-all hover:scale-105 active:scale-95 group">
                    Join Academy
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "xl:hidden fixed inset-0 z-[90] bg-[var(--bg-primary)] transition-all duration-500 ease-[var(--ease-in-out-premium)]",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      )}>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--brand-500)]/5 to-transparent" />
        <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-6 p-6 sm:p-8 relative z-10 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-4 text-xl sm:text-2xl font-black text-[var(--text-primary)] hover:text-[var(--brand-500)] transition-all transform uppercase tracking-tighter",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              )}
              style={{ transitionDelay: `${index * 50}ms`, transitionDuration: '500ms' }}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              {item.label}
            </Link>
          ))}
          <div className="w-24 h-px bg-[var(--border-primary)] my-4 sm:my-6" />
          <div className="flex flex-col w-full max-w-xs gap-4">
            {isAuthenticated && user ? (
               <Link to={`/dashboard/${user.role.toLowerCase()}`} className="w-full" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full rounded-2xl font-black bg-[var(--brand-600)] text-white uppercase text-xs tracking-widest shadow-xl min-h-[48px]">
                  Return to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full rounded-2xl font-bold uppercase text-xs tracking-widest border-2 min-h-[48px]">Sign In</Button>
                </Link>
                <Link to="/register" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full rounded-2xl font-black bg-[var(--brand-600)] text-white uppercase text-xs tracking-widest shadow-xl min-h-[48px]">Join the Academy</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
