import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ADMIN_NAV,
  TRAINER_NAV,
  STUDENT_NAV,
  MENTOR_NAV,
} from "@/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  LayoutDashboard,
  Users,
  BookOpen,
  UserCheck,
  DollarSign,
  BarChart3,
  Settings,
  FileCheck,
  Video,
  ClipboardList,
  Award,
  Briefcase,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  DollarSign,
  BarChart3,
  Settings,
  FileCheck,
  Video,
  ClipboardList,
  Award,
  Briefcase,
  TrendingUp,
  MessageSquare,
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function DashboardShell({ children, user }: DashboardLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const logout = useAuthStore((state) => state.logout);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = ({
    ADMIN: ADMIN_NAV,
    TRAINER: TRAINER_NAV,
    STUDENT: STUDENT_NAV,
    MENTOR: MENTOR_NAV,
  } as Record<string, any>)[user.role] || STUDENT_NAV;

  const roleBadgeColor = {
    ADMIN: "from-red-500 to-orange-500",
    TRAINER: "from-blue-500 to-cyan-500",
    STUDENT: "from-emerald-500 to-teal-500",
    MENTOR: "from-purple-500 to-pink-500",
  }[user.role as 'ADMIN' | 'TRAINER' | 'STUDENT' | 'MENTOR'] || "from-gray-500 to-gray-600";

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 h-full flex flex-col border-r border-[var(--border-primary)] bg-[var(--bg-secondary)] transition-all duration-300",
          collapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("h-16 flex items-center border-b border-[var(--border-primary)] px-4", collapsed && "justify-center")}>
          <Logo iconOnly={collapsed} className={cn(collapsed ? "scale-90" : "scale-90 origin-left")} />
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item: any) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || (item.href !== `/dashboard/${user.role.toLowerCase()}` && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--brand-600)]/15 text-[var(--brand-300)] border border-[var(--brand-600)]/20 shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-[var(--brand-400)]")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="hidden lg:flex px-3 py-2 border-t border-[var(--border-primary)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all text-sm"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* User section */}
        <div className={cn("p-4 border-t border-[var(--border-primary)]", collapsed && "px-2")}>
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                <div className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r text-white", roleBadgeColor)}>
                  {user.role}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="relative z-40 h-16 flex items-center gap-4 px-6 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search courses, students, modules..."
                className="w-full h-9 pl-10 pr-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] transition-colors"
                id="global-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
                className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--brand-500)] rounded-full animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-secondary)]/50">
                    <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
                    <span className="text-xs text-[var(--brand-400)] cursor-pointer hover:underline">Mark all as read</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { title: "New Assignment Graded", desc: "Your orientation module was graded.", time: "2h ago", unread: true },
                      { title: "Live Session Reminder", desc: "Mentorship session starts in 1 hour.", time: "5h ago", unread: true },
                      { title: "Welcome to SIBA", desc: "Start exploring the platform today.", time: "1d ago", unread: false },
                    ].map((n, i) => (
                      <div key={i} className={cn("p-4 border-b border-[var(--border-secondary)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer", n.unread && "bg-[var(--brand-500)]/5")}>
                        <div className="flex gap-3">
                          <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.unread ? "bg-[var(--brand-500)]" : "bg-transparent")} />
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{n.title}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{n.desc}</p>
                            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
                    <button className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}


