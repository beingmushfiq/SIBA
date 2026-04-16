import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Search, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function TrainerStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Nadia Ahmed', email: 'nadia@student.siba.academy', course: 'Full-Stack Web Dev', progress: 68, lastActive: '2 hours ago' },
    { id: 2, name: 'Karim Hassan', email: 'karim@student.siba.academy', course: 'Full-Stack Web Dev', progress: 42, lastActive: '1 day ago' },
    { id: 3, name: 'Fatima Sultana', email: 'fatima@student.siba.academy', course: 'Full-Stack Web Dev', progress: 100, lastActive: '3 hours ago' },
    { id: 4, name: 'Rafiq Uddin', email: 'rafiq@student.siba.academy', course: 'Cloud Architecture', progress: 15, lastActive: '5 days ago' },
    { id: 5, name: 'Imran Sheikh', email: 'imran@student.siba.academy', course: 'AI Business Automation', progress: 89, lastActive: '1 hour ago' },
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Students</h1>
        <p className="text-[var(--text-secondary)] mt-1">Students enrolled in your courses.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={students.length} icon="Users" color="#6366f1" index={0} />
        <StatCard label="Active Today" value={students.filter(s => s.lastActive.includes('hour')).length} icon="TrendingUp" color="#10b981" index={1} />
        <StatCard label="Completed" value={students.filter(s => s.progress === 100).length} icon="CheckCircle2" color="#f59e0b" index={2} />
        <StatCard label="Avg Progress" value={`${Math.round(students.reduce((s, st) => s + st.progress, 0) / students.length)}%`} icon="BarChart3" color="#ec4899" index={3} />
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((student) => (
            <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center text-sm font-bold text-[var(--brand-500)]">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{student.name}</p>
                  <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {student.course}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-muted)]">Progress</span>
                    <span className="text-[var(--text-primary)] font-semibold">{student.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-400)]" style={{ width: `${student.progress}%` }} />
                  </div>
                </div>
                <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{student.lastActive}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
