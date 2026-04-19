import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Search, BookOpen, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export default function TrainerStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: students, isLoading } = useQuery({
    queryKey: ['trainer-students'],
    queryFn: async () => {
      const response = await api.get('/api/trainer/students');
      return response.data;
    }
  });

  const filtered = students?.filter((s: any) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" /></div>;

  const totalStudents = students?.length || 0;
  const completedStudents = students?.filter((s: any) => s.progress === 100).length || 0;
  const avgProgress = totalStudents > 0 
    ? Math.round(students.reduce((acc: number, s: any) => acc + s.progress, 0) / totalStudents) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Student Intelligence</h1>
        <p className="text-[var(--text-secondary)] mt-1 font-medium italic opacity-70">Real-time performance tracking for your active cohorts.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Users" value={totalStudents} icon="Users" color="var(--brand-500)" index={0} />
        <StatCard label="Success Rate" value={`${Math.round((completedStudents/totalStudents)*100 || 0)}%`} icon="TrendingUp" color="#10b981" index={1} />
        <StatCard label="Graduates" value={completedStudents} icon="CheckCircle2" color="#f59e0b" index={2} />
        <StatCard label="Network Depth" value={`${avgProgress}%`} icon="BarChart3" color="#ec4899" index={3} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search cohort members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)]/50 transition-all text-[var(--text-primary)] font-medium"
          />
        </div>
      </div>

      <Card className="border-[var(--border-secondary)] bg-[var(--bg-primary)]/50 backdrop-blur-xl">
        <CardHeader className="border-b border-[var(--border-secondary)] px-6 py-4">
          <CardTitle className="text-lg font-black uppercase tracking-widest text-[var(--text-muted)] opacity-60">Enrolled Operatives</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--border-secondary)]">
            {filtered.map((student: any) => (
              <div key={student.id} className="p-6 hover:bg-[var(--bg-secondary)]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-600)] flex items-center justify-center text-lg font-black text-white shadow-lg shadow-[var(--brand-500)]/20">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{student.name}</h3>
                    <p className="text-sm font-black uppercase tracking-widest text-[var(--brand-500)] mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {student.course}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className="w-48">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                      <span className="text-[var(--text-muted)]">Neural Progress</span>
                      <span className={student.progress === 100 ? 'text-emerald-500' : 'text-[var(--brand-500)]'}>{student.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${student.progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_#10b98155]' : 'bg-[var(--brand-500)] shadow-[0_0_10px_var(--brand-500)55]'}`} 
                        style={{ width: `${student.progress}%` }} 
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Last Sync</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">{student.lastActive}</p>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-20 text-center space-y-4">
                 <div className="w-16 h-16 rounded-3xl border-4 border-dashed border-[var(--border-secondary)] mx-auto animate-spin-slow" />
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">Zero matches found in cohort</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
