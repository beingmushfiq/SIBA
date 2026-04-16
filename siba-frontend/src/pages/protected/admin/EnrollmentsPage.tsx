import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { UserCheck, Loader2, Search, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function EnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/admin/stats');
        return response.data;
      } catch {
        return { metrics: [], recentUsers: [] };
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Loading enrollments...</p>
      </div>
    );
  }

  const enrollments = [
    { id: 1, student: 'Nadia Ahmed', course: 'Full-Stack Web Development', status: 'ACTIVE', progress: 68, enrolled: '2026-03-15' },
    { id: 2, student: 'Karim Hassan', course: 'AI-Powered Business Automation', status: 'ACTIVE', progress: 42, enrolled: '2026-03-20' },
    { id: 3, student: 'Fatima Sultana', course: 'Digital Marketing Mastery', status: 'COMPLETED', progress: 100, enrolled: '2026-02-10' },
    { id: 4, student: 'Rafiq Uddin', course: 'Cloud Architecture & DevOps', status: 'ACTIVE', progress: 15, enrolled: '2026-04-01' },
    { id: 5, student: 'Salma Khatun', course: 'Full-Stack Web Development', status: 'DROPPED', progress: 22, enrolled: '2026-01-25' },
    { id: 6, student: 'Imran Sheikh', course: 'AI-Powered Business Automation', status: 'ACTIVE', progress: 89, enrolled: '2026-02-28' },
  ];

  const filteredEnrollments = enrollments.filter(e =>
    e.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'DROPPED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Enrollment Management</h1>
        <p className="text-[var(--text-secondary)] mt-1">Track all student enrollments and progress.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Enrollments" value={enrollments.length} icon="UserCheck" color="#6366f1" index={0} />
        <StatCard label="Active" value={enrollments.filter(e => e.status === 'ACTIVE').length} icon="Clock" color="#3b82f6" index={1} />
        <StatCard label="Completed" value={enrollments.filter(e => e.status === 'COMPLETED').length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Avg Progress" value={`${Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)}%`} icon="BarChart3" color="#f59e0b" index={3} />
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search by student or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-[var(--brand-500)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{enrollment.student}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {enrollment.course}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--text-muted)]">Progress</span>
                      <span className="text-[var(--text-primary)] font-semibold">{enrollment.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-400)] transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(enrollment.status)}`}>
                    {enrollment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
