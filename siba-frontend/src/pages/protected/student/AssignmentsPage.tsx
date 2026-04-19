import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { ClipboardList, Upload, FileText } from 'lucide-react';

export default function AssignmentsPage() {
  const assignments = [
    { id: 1, title: 'Build a REST API with Express', course: 'Full-Stack Web Dev', module: 'Backend Fundamentals', dueDate: '2026-04-20', status: 'pending', type: 'project' },
    { id: 2, title: 'React Component Architecture', course: 'Full-Stack Web Dev', module: 'Frontend Mastery', dueDate: '2026-04-25', status: 'pending', type: 'assignment' },
    { id: 3, title: 'Database Design Quiz', course: 'Full-Stack Web Dev', module: 'Data Layer', dueDate: '2026-04-10', status: 'submitted', type: 'quiz', score: 88 },
    { id: 4, title: 'Git Workflow Exercise', course: 'Full-Stack Web Dev', module: 'Orientation', dueDate: '2026-04-05', status: 'graded', type: 'assignment', score: 92 },
    { id: 5, title: 'Deploy to Cloud', course: 'Cloud Architecture', module: 'Deployment', dueDate: '2026-04-18', status: 'overdue', type: 'project' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'Pending' };
      case 'submitted': return { color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', label: 'Submitted' };
      case 'graded': return { color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', label: 'Graded' };
      case 'overdue': return { color: 'bg-red-500/10 text-red-500 border-red-500/20', label: 'Overdue' };
      default: return { color: 'bg-gray-500/10 text-gray-500', label: status };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Assignments</h1>
        <p className="text-[var(--text-secondary)] mt-1">Track and submit your assignments and quizzes.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total" value={assignments.length} icon="ClipboardList" color="#6366f1" index={0} />
        <StatCard label="Pending" value={assignments.filter(a => a.status === 'pending').length} icon="Clock" color="#3b82f6" index={1} />
        <StatCard label="Completed" value={assignments.filter(a => ['submitted', 'graded'].includes(a.status)).length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Overdue" value={assignments.filter(a => a.status === 'overdue').length} icon="AlertCircle" color="#ef4444" index={3} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignments.map((assignment) => {
            const badge = getStatusBadge(assignment.status);
            return (
              <div key={assignment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${assignment.type === 'quiz' ? 'bg-purple-500/10' : 'bg-[var(--brand-500)]/10'}`}>
                    {assignment.type === 'quiz' ? (
                      <FileText className={`w-5 h-5 text-purple-500`} />
                    ) : (
                      <ClipboardList className={`w-5 h-5 text-[var(--brand-500)]`} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{assignment.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{assignment.course} • {assignment.module}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[var(--text-muted)]">Due: {assignment.dueDate}</p>
                    {assignment.score !== undefined && (
                      <p className="text-sm font-bold text-[var(--brand-400)]">{assignment.score}/100</p>
                    )}
                  </div>
                  <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                    {badge.label}
                  </Badge>
                  {assignment.status === 'pending' && (
                    <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" /> Submit
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
