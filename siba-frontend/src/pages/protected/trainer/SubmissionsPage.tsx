import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { FileCheck, Eye } from 'lucide-react';

export default function SubmissionsPage() {
  const submissions = [
    { id: 1, student: 'Nadia Ahmed', task: 'Build a REST API', course: 'Full-Stack Web Dev', submitted: '2026-04-14', status: 'pending', grade: null },
    { id: 2, student: 'Karim Hassan', task: 'Database Schema Design', course: 'Full-Stack Web Dev', submitted: '2026-04-13', status: 'graded', grade: 92 },
    { id: 3, student: 'Imran Sheikh', task: 'ML Model Training Report', course: 'AI Business Automation', submitted: '2026-04-12', status: 'pending', grade: null },
    { id: 4, student: 'Fatima Sultana', task: 'Marketing Campaign Plan', course: 'Digital Marketing', submitted: '2026-04-11', status: 'graded', grade: 88 },
    { id: 5, student: 'Rafiq Uddin', task: 'Docker Compose Setup', course: 'Cloud Architecture', submitted: '2026-04-10', status: 'revision', grade: null },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'graded': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'revision': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Submissions</h1>
        <p className="text-[var(--text-secondary)] mt-1">Review and grade student submissions.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Submissions" value={submissions.length} icon="FileCheck" color="#6366f1" index={0} />
        <StatCard label="Pending Review" value={submissions.filter(s => s.status === 'pending').length} icon="Clock" color="#f59e0b" index={1} />
        <StatCard label="Graded" value={submissions.filter(s => s.status === 'graded').length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Needs Revision" value={submissions.filter(s => s.status === 'revision').length} icon="XCircle" color="#ef4444" index={3} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Submissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] gap-4">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sub.status === 'pending' ? 'bg-amber-500/10' : sub.status === 'graded' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  <FileCheck className={`w-5 h-5 ${sub.status === 'pending' ? 'text-amber-500' : sub.status === 'graded' ? 'text-emerald-500' : 'text-red-500'}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[var(--text-primary)] truncate">{sub.task}</p>
                  <p className="text-xs text-[var(--text-muted)]">{sub.student} • {sub.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {sub.grade !== null && (
                  <span className="text-lg font-bold text-[var(--brand-400)]">{sub.grade}/100</span>
                )}
                <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(sub.status)}`}>
                  {sub.status}
                </Badge>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
