import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { Search, BookOpen, Phone, Loader2, Users } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export default function MentorStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['mentor-students'],
    queryFn: async () => {
      const response = await api.get('/api/mentor/dashboard');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Retrieving student records...</p>
      </div>
    );
  }

  const assignments = data?.assignments || [];
  const students = assignments.map((a: any) => ({
    id: a.id,
    name: a.student.name,
    email: a.student.email,
    course: a.course?.title || 'General Curriculum',
    progress: a.student.progress || 0,
    stage: a.student.progress >= 100 ? 'Growth' : (a.student.progress >= 50 ? 'Execution' : 'Planning'),
    lastSession: 'Linked',
    phone: '#'
  }));

  const filtered = students.filter((s: any) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Execution': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Revenue': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Growth': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Assigned Students</h1>
        <p className="text-[var(--text-secondary)] mt-1">Monitor and guide your assigned mentees.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Mentees" value={students.length} icon="Users" color="#8b5cf6" index={0} />
        <StatCard label="Active" value={students.filter((s: any) => s.progress < 100).length} icon="TrendingUp" color="#6366f1" index={1} />
        <StatCard label="Completed" value={students.filter((s: any) => s.progress === 100).length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Engagement" value="High" icon="Zap" color="#ef4444" index={3} />
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.length === 0 ? (
           <div className="md:col-span-2 py-20 text-center bg-[var(--bg-secondary)] rounded-2xl border-2 border-dashed border-[var(--border-secondary)]">
              <Users className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4 opacity-20" />
              <p className="text-[var(--text-primary)] font-bold">Registry Empty</p>
              <p className="text-[var(--text-secondary)] text-sm">No students have been assigned to your operational sector yet.</p>
           </div>
        ) : filtered.map((student: any) => (
          <Card key={student.id} className="overflow-hidden border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all duration-300 bg-[var(--bg-secondary)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center text-lg font-bold text-[var(--brand-500)]">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{student.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{student.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase ${getStageColor(student.stage)}`}>
                  {student.stage}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <BookOpen className="w-3.5 h-3.5" /> {student.course}
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-muted)]">Progress</span>
                    <span className="text-[var(--text-primary)] font-semibold">{student.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)]" style={{ width: `${student.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[var(--text-muted)]">Status: {student.lastSession}</span>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Phone className="w-3 h-3" /> Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
