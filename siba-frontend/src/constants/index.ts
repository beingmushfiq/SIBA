export const APP_NAME = "SIBA";
export const APP_FULL_NAME = "Sherazi IT Business Academy";
export const APP_DESCRIPTION = "Modernizing businesses through elite IT training and strategic growth execution.";

export const ROLES = {
  ADMIN: "ADMIN",
  TRAINER: "TRAINER",
  STUDENT: "STUDENT",
  MENTOR: "MENTOR",
} as const;

export const COURSE_LEVELS = [
  { value: "BEGINNER", label: "Beginner", color: "#10b981" },
  { value: "INTERMEDIATE", label: "Intermediate", color: "#f59e0b" },
  { value: "ADVANCED", label: "Advanced", color: "#ef4444" },
  { value: "EXPERT", label: "Expert", color: "#8b5cf6" },
] as const;

export const MODULE_TYPES = [
  { value: "ORIENTATION", label: "Orientation", icon: "Compass", color: "#818cf8" },
  { value: "CORE", label: "Core Learning", icon: "BookOpen", color: "#6366f1" },
  { value: "PRACTICAL", label: "Practical", icon: "Wrench", color: "#10b981" },
  { value: "EVALUATION", label: "Evaluation", icon: "ClipboardCheck", color: "#f59e0b" },
  { value: "CERTIFICATION", label: "Certification", icon: "Award", color: "#ec4899" },
] as const;

export const BUSINESS_STAGES = [
  { value: "IDEA", label: "Idea", icon: "Lightbulb" },
  { value: "PLAN", label: "Planning", icon: "FileText" },
  { value: "EXECUTION", label: "Execution", icon: "Rocket" },
  { value: "REVENUE", label: "Revenue", icon: "DollarSign" },
  { value: "GROWTH", label: "Growth", icon: "TrendingUp" },
] as const;

export const ADMIN_NAV = [
  { title: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
  { title: "Users", href: "/dashboard/admin/users", icon: "Users" },
  { title: "Courses", href: "/dashboard/admin/courses", icon: "GraduationCap" },
  { title: "Certificates", href: "/dashboard/admin/certificates", icon: "Award" },
  { title: "Enrollments", href: "/dashboard/admin/enrollments", icon: "UserCheck" },
  { title: "Revenue", href: "/dashboard/admin/revenue", icon: "DollarSign" },
  { title: "Analytics", href: "/dashboard/admin/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/dashboard/admin/settings", icon: "Settings" },
];

export const TRAINER_NAV = [
  { title: "Dashboard", href: "/dashboard/trainer", icon: "LayoutDashboard" },
  { title: "My Courses", href: "/dashboard/trainer/courses", icon: "BookOpen" },
  { title: "Students", href: "/dashboard/trainer/students", icon: "Users" },
  { title: "Submissions", href: "/dashboard/trainer/submissions", icon: "FileCheck" },
  { title: "Live Sessions", href: "/dashboard/trainer/sessions", icon: "Video" },
  { title: "Analytics", href: "/dashboard/trainer/analytics", icon: "BarChart3" },
];

export const STUDENT_NAV = [
  { title: "Dashboard", href: "/dashboard/student", icon: "LayoutDashboard" },
  { title: "My Courses", href: "/dashboard/student/courses", icon: "BookOpen" },
  { title: "Assignments", href: "/dashboard/student/assignments", icon: "ClipboardList" },
  { title: "Certificates", href: "/dashboard/student/certificates", icon: "Award" },
  { title: "Business Plan", href: "/dashboard/student/business", icon: "Briefcase" },
  { title: "Progress", href: "/dashboard/student/progress", icon: "TrendingUp" },
];

export const MENTOR_NAV = [
  { title: "Dashboard", href: "/dashboard/mentor", icon: "LayoutDashboard" },
  { title: "Students", href: "/dashboard/mentor/students", icon: "Users" },
  { title: "Sessions", href: "/dashboard/mentor/sessions", icon: "Video" },
  { title: "Feedback", href: "/dashboard/mentor/feedback", icon: "MessageSquare" },
];
