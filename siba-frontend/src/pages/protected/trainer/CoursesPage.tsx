import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { BookOpen, Plus, Loader2, Users, BarChart3, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainerCoursesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['trainer-courses'],
    queryFn: async () => {
      const response = await api.get('/api/trainer/dashboard');
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

  const courses = data?.courses || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Courses</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your course content and curriculum.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> New Course
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Courses" value={courses.length || 0} icon="BookOpen" color="#6366f1" index={0} />
        <StatCard label="Published" value={courses.filter?.((c: any) => c.published)?.length || 0} icon="Eye" color="#10b981" index={1} />
        <StatCard label="Total Students" value={courses.reduce?.((s: number, c: any) => s + (c.enrollments_count || 0), 0) || 0} icon="Users" color="#ec4899" index={2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-primary)]">
            <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] mb-4">No courses yet. Create your first course!</p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Create Course
            </Button>
          </div>
        ) : (
          courses.map((course: any) => (
            <Card key={course.id} className="overflow-hidden border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all duration-300 group bg-[var(--bg-secondary)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[var(--brand-500)]" />
                  </div>
                  {course.published ? (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">LIVE</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">DRAFT</Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-2 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.enrollments_count || 0} students</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {course.modules_count || 0} modules</span>
                </div>
                <Link to={`/dashboard/trainer/courses/${course.slug}/edit`}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Edit className="w-3.5 h-3.5" /> Edit Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
