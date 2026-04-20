import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { FileText, Loader2, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export default function AssignmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['student-assignments'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Syncing task records...</p>
      </div>
    );
  }

  const enrollments = data?.enrollments || [];
  
  // In our simplified logic, each enrollment represents a major task
  // In a real expanded app, we'd fetch from an /api/assignments endpoint
  const tasks = enrollments.map((enr: any) => ({
    id: enr.id,
    title: enr.course.title,
    course: enr.course.category,
    status: enr.status === 'COMPLETED' ? 'graded' : 'pending',
    type: 'course',
    progress: enr.progress_percentage,
    slug: enr.course.slug
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'In Progress' };
      case 'submitted': return { color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', label: 'Submitted' };
      case 'graded': return { color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', label: 'Finalized' };
      case 'overdue': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', label: 'Deadline Missed' };
      default: return { color: 'bg-gray-500/10 text-gray-500', label: status };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Curriculum Tasks</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage your active learning modules and assessments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Modules" value={tasks.length} icon="ClipboardList" color="#6366f1" index={0} />
        <StatCard label="Pending" value={tasks.filter((a: any) => a.status === 'pending').length} icon="Clock" color="#3b82f6" index={1} />
        <StatCard label="Finalized" value={tasks.filter((a: any) => a.status === 'graded').length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Success Rate" value={tasks.length > 0 ? "100%" : "0%"} icon="Target" color="#ec4899" index={3} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operational Backlog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.length === 0 ? (
             <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border-2 border-dashed border-[var(--border-secondary)]">
                <p className="text-[var(--text-muted)] font-medium">No tasks found in your learning registry.</p>
             </div>
          ) : tasks.map((task: any) => {
            const badge = getStatusBadge(task.status);
            return (
              <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--brand-500)]/10`}>
                    <FileText className={`w-5 h-5 text-[var(--brand-500)]`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{task.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{task.course} Integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[var(--text-muted)]">Integrity: {task.progress}%</p>
                  </div>
                  <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                    {badge.label}
                  </Badge>
                  <Link to={`/dashboard/student/learn/${task.slug}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                      <PlayCircle className="w-3.5 h-3.5" /> Continue
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
