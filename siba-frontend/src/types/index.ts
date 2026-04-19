// ─── User Types ─────────────────────────────────────────────
export type UserRole = 'STUDENT' | 'TRAINER' | 'ADMIN' | 'MENTOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  level: string;
  bio?: string;
  phone?: string;
  skills?: string[];
  is_active?: boolean;
  created_at?: string;
}

// ─── Course Types ───────────────────────────────────────────
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type ModuleType = 'ORIENTATION' | 'CORE' | 'PRACTICAL' | 'EVALUATION' | 'CERTIFICATION';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  price: number;
  published: boolean;
  thumbnail?: string;
  trainer_id: string;
  category_id?: string;
  trainer?: Pick<User, 'id' | 'name'>;
  category?: Category;
  enrollments_count?: number;
  modules_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  courses_count?: number;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  type: ModuleType;
  order: number;
  course_id: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url?: string;
  duration?: number;
  order: number;
  module_id: string;
}

// ─── Enrollment Types ───────────────────────────────────────
export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED';

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: EnrollmentStatus;
  progress: number;
  user?: User;
  course?: Course;
  created_at: string;
}

// ─── Certificate Types ──────────────────────────────────────
export interface Certificate {
  id: string;
  certificate_no: string;
  user_id: string;
  course_id: string;
  issued_at: string;
  revoked: boolean;
  user?: User;
  course?: Course;
}

// ─── Navigation Types ───────────────────────────────────────
export interface NavItem {
  title: string;
  href: string;
  icon: string;
}
