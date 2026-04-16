import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

// ─── Layouts ────────────────────────────────────────────────
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// ─── Public Pages ───────────────────────────────────────────
import HomePage from './pages/public/HomePage';
import CatalogPage from './pages/public/courses/CatalogPage';
import CourseDetailPage from './pages/public/courses/CourseDetailPage';
import LoginPage from './pages/public/auth/LoginPage';
import RegisterPage from './pages/public/auth/RegisterPage';
import LearningProcessPage from './pages/public/info/LearningProcessPage';
import MentorsPage from './pages/public/info/MentorsPage';
import LearnersPage from './pages/public/info/LearnersPage';
import CertificateVerificationPage from './pages/public/info/CertificateVerificationPage';
import AboutUsPage from './pages/public/info/AboutUsPage';

// ─── Student Pages ──────────────────────────────────────────
import StudentDashboard from './pages/protected/student/StudentDashboard';
import StudentCoursesPage from './pages/protected/student/CoursesPage';
import AssignmentsPage from './pages/protected/student/AssignmentsPage';
import StudentCertificates from './pages/protected/student/Certificates';
import BusinessTracker from './pages/protected/student/BusinessTracker';
import ProgressPage from './pages/protected/student/ProgressPage';
import LearningPlatform from './pages/protected/student/LearningPlatform';

// ─── Trainer Pages ──────────────────────────────────────────
import TrainerDashboard from './pages/protected/trainer/TrainerDashboard';
import TrainerCoursesPage from './pages/protected/trainer/CoursesPage';
import TrainerStudentsPage from './pages/protected/trainer/StudentsPage';
import SubmissionsPage from './pages/protected/trainer/SubmissionsPage';
import TrainerSessionsPage from './pages/protected/trainer/SessionsPage';
import TrainerAnalyticsPage from './pages/protected/trainer/AnalyticsPage';
import CourseEditor from './pages/protected/trainer/CourseEditor';

// ─── Admin Pages ────────────────────────────────────────────
import AdminDashboard from './pages/protected/admin/AdminDashboard';
import UsersPage from './pages/protected/admin/UsersPage';
import AdminCoursesPage from './pages/protected/admin/CoursesPage';
import CertificateControl from './pages/protected/admin/CertificateControl';
import EnrollmentsPage from './pages/protected/admin/EnrollmentsPage';
import RevenuePage from './pages/protected/admin/RevenuePage';
import AdminAnalyticsPage from './pages/protected/admin/AnalyticsPage';
import SettingsPage from './pages/protected/admin/SettingsPage';

// ─── Mentor Pages ───────────────────────────────────────────
import MentorDashboard from './pages/protected/mentor/MentorDashboard';
import MentorStudentsPage from './pages/protected/mentor/StudentsPage';
import MentorSessionsPage from './pages/protected/mentor/SessionsPage';
import FeedbackPage from './pages/protected/mentor/FeedbackPage';

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
