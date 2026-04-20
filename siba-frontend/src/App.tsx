import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { LoadingOverlay } from './components/layout/LoadingOverlay';
import toast from 'react-hot-toast';


// ─── Layouts ────────────────────────────────────────────────
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// ─── Public Pages ───────────────────────────────────────────
const HomePage = lazy(() => import('./pages/public/HomePage'));
const CatalogPage = lazy(() => import('./pages/public/courses/CatalogPage'));
const CourseDetailPage = lazy(() => import('./pages/public/courses/CourseDetailPage'));
const LoginPage = lazy(() => import('./pages/public/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/auth/RegisterPage'));
const LearningProcessPage = lazy(() => import('./pages/public/info/LearningProcessPage'));
const MentorsPage = lazy(() => import('./pages/public/info/MentorsPage'));
const LearnersPage = lazy(() => import('./pages/public/info/LearnersPage'));
const CertificateVerificationPage = lazy(() => import('./pages/public/info/CertificateVerificationPage'));
const AboutUsPage = lazy(() => import('./pages/public/info/AboutUsPage'));

// ─── Student Pages ──────────────────────────────────────────
const StudentDashboard = lazy(() => import('./pages/protected/student/StudentDashboard'));
const StudentCoursesPage = lazy(() => import('./pages/protected/student/CoursesPage'));
const AssignmentsPage = lazy(() => import('./pages/protected/student/AssignmentsPage'));
const StudentCertificates = lazy(() => import('./pages/protected/student/Certificates'));
const BusinessTracker = lazy(() => import('./pages/protected/student/BusinessTracker'));
const ProgressPage = lazy(() => import('./pages/protected/student/ProgressPage'));
const LearningPlatform = lazy(() => import('./pages/protected/student/LearningPlatform'));

// ─── Trainer Pages ──────────────────────────────────────────
const TrainerDashboard = lazy(() => import('./pages/protected/trainer/TrainerDashboard'));
const TrainerCoursesPage = lazy(() => import('./pages/protected/trainer/CoursesPage'));
const TrainerStudentsPage = lazy(() => import('./pages/protected/trainer/StudentsPage'));
const SubmissionsPage = lazy(() => import('./pages/protected/trainer/SubmissionsPage'));
const TrainerSessionsPage = lazy(() => import('./pages/protected/trainer/SessionsPage'));
const TrainerAnalyticsPage = lazy(() => import('./pages/protected/trainer/AnalyticsPage'));
const CourseEditor = lazy(() => import('./pages/protected/trainer/CourseEditor'));

// ─── Admin Pages ────────────────────────────────────────────
const AdminDashboard = lazy(() => import('./pages/protected/admin/AdminDashboard'));
const UsersPage = lazy(() => import('./pages/protected/admin/UsersPage'));
const AdminCoursesPage = lazy(() => import('./pages/protected/admin/CoursesPage'));
const CertificateControl = lazy(() => import('./pages/protected/admin/CertificateControl'));
const EnrollmentsPage = lazy(() => import('./pages/protected/admin/EnrollmentsPage'));
const RevenuePage = lazy(() => import('./pages/protected/admin/RevenuePage'));
const AdminAnalyticsPage = lazy(() => import('./pages/protected/admin/AnalyticsPage'));
const SettingsPage = lazy(() => import('./pages/protected/admin/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/protected/shared/ProfilePage'));

// ─── Mentor Pages ───────────────────────────────────────────
const MentorDashboard = lazy(() => import('./pages/protected/mentor/MentorDashboard'));
const MentorStudentsPage = lazy(() => import('./pages/protected/mentor/StudentsPage'));
const MentorSessionsPage = lazy(() => import('./pages/protected/mentor/SessionsPage'));
const FeedbackPage = lazy(() => import('./pages/protected/mentor/FeedbackPage'));

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    toast.success('SIBA Platform Initialized');
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>
        {/* ── Public Pages ─────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CatalogPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/learning-process" element={<LearningProcessPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/learners" element={<LearnersPage />} />
          <Route path="/verify-certificate" element={<CertificateVerificationPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        {/* ── Auth Pages (no layout chrome) ────────────────── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ── Student Dashboard ────────────────────────────── */}
        <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCoursesPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="certificates" element={<StudentCertificates />} />
            <Route path="business" element={<BusinessTracker />} />
            <Route path="progress" element={<ProgressPage />} />
          </Route>
          {/* Immersive learning view (no dashboard shell) */}
          <Route path="learn/:slug" element={<LearningPlatform />} />
        </Route>

        {/* ── Trainer Dashboard ────────────────────────────── */}
        <Route path="/dashboard/trainer" element={<ProtectedRoute allowedRoles={['TRAINER', 'ADMIN']} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<TrainerDashboard />} />
            <Route path="courses" element={<TrainerCoursesPage />} />
            <Route path="courses/:slug/edit" element={<CourseEditor />} />
            <Route path="students" element={<TrainerStudentsPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="sessions" element={<TrainerSessionsPage />} />
            <Route path="analytics" element={<TrainerAnalyticsPage />} />
          </Route>
        </Route>

        {/* ── Mentor Dashboard ─────────────────────────────── */}
        <Route path="/dashboard/mentor" element={<ProtectedRoute allowedRoles={['MENTOR']} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<MentorDashboard />} />
            <Route path="students" element={<MentorStudentsPage />} />
            <Route path="sessions" element={<MentorSessionsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>
        </Route>

        {/* ── Admin Dashboard ──────────────────────────────── */}
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="certificates" element={<CertificateControl />} />
            <Route path="enrollments" element={<EnrollmentsPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        {/* ── SHARED AUTH ROUTES ───────────────────────────── */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'TRAINER', 'MENTOR', 'ADMIN']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
