import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  // If still checking session, we can show a loader or nothing
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Checking session...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user role doesn't match, redirect to unauthorized / or default dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
     return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }

  return <Outlet />;
}
