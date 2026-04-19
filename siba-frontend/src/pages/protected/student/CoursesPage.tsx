import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { BookOpen, Loader2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentCoursesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Loading your courses...</p>
      </div>
    );
  }

  const enrollments = data?.enrollments || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Courses</h1>
        <p className="text-[var(--text-secondary)] mt-1">Continue your learning journey.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Enrolled" value={enrollments.length} icon="BookOpen" color="#6366f1" index={0} />
        <StatCard label="In Progress" value={enrollments.filter((e: any) => e.status === 'ACTIVE').length} icon="Clock" color="#f59e0b" index={1} />
        <StatCard label="Completed" value={enrollments.filter((e: any) => e.status === 'COMPLETED').length} icon="CheckCircle2" color="#10b981" index={2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {enrollments.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-primary)]">
            <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] mb-2">You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="text-sm text-[var(--brand-400)] hover:underline">Browse the catalog →</Link>
          </div>
        ) : (
          enrollments.map((enrollment: any) => {
            const course = enrollment.course || {};
            const progress = enrollment.progress || 0;
            return (
              <Card key={enrollment.id} className="overflow-hidden border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all duration-300 group bg-[var(--bg-secondary)]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[var(--brand-500)]" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${enrollment.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                      {enrollment.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-4">
                    {course.title || 'Untitled Course'}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Progress</span>
                      <span className="text-[var(--text-primary)] font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <Link to={`/dashboard/student/learn/${course.slug}`}>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-sm font-medium hover:bg-[var(--brand-500)]/20 transition-all">
                      <Play className="w-4 h-4" /> Continue Learning
                    </button>
                  </Link>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
