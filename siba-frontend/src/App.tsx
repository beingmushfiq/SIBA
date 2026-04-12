import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

// Public Pages
import HomePage from './pages/public/HomePage';
import CatalogPage from './pages/public/courses/CatalogPage';
import CourseDetailPage from './pages/public/courses/CourseDetailPage';
import LoginPage from './pages/public/auth/LoginPage';
import RegisterPage from './pages/public/auth/RegisterPage';

// New Info Pages
import LearningProcessPage from './pages/public/info/LearningProcessPage';
import MentorsPage from './pages/public/info/MentorsPage';
import LearnersPage from './pages/public/info/LearnersPage';
import CertificateVerificationPage from './pages/public/info/CertificateVerificationPage';
import AboutUsPage from './pages/public/info/AboutUsPage';

// Protected Layouts & Routes
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import StudentLayout from './layouts/StudentLayout';

import StudentDashboard from './pages/protected/student/StudentDashboard';
import LearningPlatform from './pages/protected/student/LearningPlatform';
import BusinessTracker from './pages/protected/student/business/BusinessTracker';
import Certificates from './pages/protected/student/Certificates';
import TrainerDashboard from './pages/protected/trainer/TrainerDashboard';
import CourseEditor from './pages/protected/trainer/CourseEditor';
import AdminDashboard from './pages/protected/admin/AdminDashboard';
import CertificateControl from './pages/protected/admin/CertificateControl';
import MentorDashboard from './pages/protected/mentor/MentorDashboard';

// Shared Components
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Shared Layout Routes */}
        <Route element={<PublicLayoutShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CatalogPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/learning-process" element={<LearningProcessPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/learners" element={<LearnersPage />} />
          <Route path="/verify-certificate" element={<CertificateVerificationPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        {/* Auth - Unstyled or different layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes - Dashboards */}
        <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          <Route element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="business" element={<BusinessTracker />} />
            <Route path="certificates" element={<Certificates />} />
          </Route>
          {/* Immersive View without normal site layout */}
          <Route path="learn/:slug" element={<LearningPlatform />} />
        </Route>
        <Route path="/dashboard/trainer" element={<ProtectedRoute allowedRoles={['TRAINER', 'ADMIN']} />}>
          <Route element={<StudentLayout />}>
             <Route index element={<TrainerDashboard />} />
             <Route path="courses/:slug/edit" element={<CourseEditor />} />
          </Route>
        </Route>
        <Route path="/dashboard/mentor" element={<ProtectedRoute allowedRoles={['MENTOR']} />}>
          <Route element={<StudentLayout />}>
             <Route index element={<MentorDashboard />} />
          </Route>
        </Route>
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<StudentLayout />}>
             <Route index element={<AdminDashboard />} />
             <Route path="certificates" element={<CertificateControl />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Unified Layout for all Public Pages
function PublicLayoutShell() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
