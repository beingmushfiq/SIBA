import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout() {
  return (
    <div className="min-h-[100dvh] bg-[var(--bg-primary)] flex flex-col w-full max-w-[100vw] overflow-x-hidden relative">
      <PublicNavbar />
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden flex flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
