import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import DashboardShell from '@/components/dashboard/dashboard-shell';

export default function StudentLayout() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <DashboardShell user={user}>
      <Outlet />
    </DashboardShell>
  );
}
