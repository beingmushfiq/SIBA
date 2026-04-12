import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Clock, ArrowRight, PlayCircle } from 'lucide-react';

export default function StudentDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  if (isLoading) return <div className="flex h-64 items-center justify-center">Loading your dashboard...</div>;
  if (error) return <div className="text-red-500">Failed to load dashboard. Try reloading.</div>;

  const metrics = data?.metrics || { inProgress: 0, completed: 0, totalCertificates: 0 };
  const enrollments = data?.enrollments || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg shadow-indigo-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Courses in Progress</p>
                <p className="text-2xl font-bold">{metrics.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Completed Courses</p>
                <p className="text-2xl font-bold">{metrics.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg shadow-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Certificates Earned</p>
                <p className="text-2xl font-bold">{metrics.totalCertificates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">My Courses</h2>
          <Link to="/courses">
            <Button variant="outline" size="sm">Browse More</Button>
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-secondary)]">
            <BookOpen className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">You aren't enrolled in any courses</h3>
            <p className="text-[var(--text-secondary)] mb-6">Browse our catalog to start learning.</p>
            <Link to="/courses">
              <Button>View Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enr: any) => (
              <Card key={enr.id} className="overflow-hidden hover:border-[var(--brand-500)] transition-colors group">
                <div className="h-32 bg-[var(--bg-tertiary)] flex items-center justify-center relative">
                   <div className="absolute top-3 left-3">
                     <Badge variant="secondary">{enr.course.category}</Badge>
                   </div>
                   <PlayCircle className="w-12 h-12 text-[var(--text-muted)] group-hover:text-[var(--brand-500)] group-hover:scale-110 transition-all" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-1">
                    {enr.course.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-6">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Status: {enr.status}</span>
                    <span>{enr.progress_percentage}% Completed</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full mb-6 overflow-hidden">
                    <div 
                      className="h-full bg-[var(--brand-500)] transition-all duration-1000 ease-out" 
                      style={{ width: `${enr.progress_percentage}%` }}
                    />
                  </div>

                  <Link to={`/dashboard/student/learn/${enr.course.slug}`} className="block">
                    <Button className="w-full shadow-brand relative overflow-hidden group/btn">
                      <span className="relative z-10 flex items-center">
                         {enr.progress_percentage > 0 ? 'Resume Course' : 'Start Learning'}
                         <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
