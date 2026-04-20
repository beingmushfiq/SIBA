import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Target, Zap, BarChart3 } from 'lucide-react';

export default function ProgressPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['student-progress'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  if (isLoading) return <div className="p-8">Syncing progress data...</div>;

  const metrics = data?.metrics || { inProgress: 0, completed: 0, totalCertificates: 0 };
  const enrollments = data?.enrollments || [];

  const achievements = [
    { title: 'First Login', icon: '🎯', earned: true, date: 'Authorized' },
    { title: 'Course Enrolled', icon: '📚', earned: enrollments.length > 0, date: enrollments.length > 0 ? 'Active' : null },
    { title: 'First Quiz Passed', icon: '✅', earned: false, date: null },
    { title: '50% Completion', icon: '🔥', earned: false, date: null },
    { title: 'Course Completed', icon: '🏆', earned: metrics.completed > 0, date: null },
  ];

  const weeklyHours = [0, 0, 0, 0, 0, 0, 0];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Execution Metrics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Track your verified milestones and knowledge mastery.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Streams" value={metrics.inProgress} icon="BookOpen" color="#6366f1" index={0} />
        <StatCard label="Finalized" value={metrics.completed} icon="CheckCircle2" color="#10b981" index={1} />
        <StatCard label="Uptime" value="Live" icon="Clock" color="#f59e0b" index={2} />
        <StatCard label="Achievements" value={`${achievements.filter(a => a.earned).length}/${achievements.length}`} icon="Award" color="#ec4899" index={3} />
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--brand-500)]" /> Knowledge Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {enrollments.length === 0 ? (
            <div className="py-12 text-center opacity-50">
               <p className="text-sm font-medium">No active integration streams detected.</p>
            </div>
          ) : enrollments.map((course: any) => (
            <div key={course.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{course.course.title}</h3>
                <span className="text-lg font-bold text-[var(--brand-400)]">{course.progress_percentage}%</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden mb-4">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] transition-all duration-1000" style={{ width: `${course.progress_percentage}%` }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{course.progress_percentage}%</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Integrity</p>
                </div>
                <div>
                   <p className="text-lg font-bold text-[var(--text-primary)]">{course.status}</p>
                   <p className="text-[10px] text-[var(--text-muted)] uppercase">Status</p>
                </div>
                <div className="hidden sm:block">
                   <p className="text-lg font-bold text-[var(--text-primary)]">Verified</p>
                   <p className="text-[10px] text-[var(--text-muted)] uppercase">Validation</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" /> Activity Pulse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-around gap-3 px-4">
              {weeklyHours.map((hours, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">0h</span>
                  <div
                    className="w-full rounded-t-lg bg-[var(--bg-tertiary)] opacity-30 h-1"
                  />
                  <span className="text-xs text-[var(--text-muted)]">{days[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> System Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.title} className={`flex items-center justify-between p-3 rounded-xl border ${achievement.earned ? 'bg-[var(--bg-secondary)] border-[var(--border-secondary)]' : 'bg-[var(--bg-tertiary)]/50 border-dashed border-[var(--border-primary)] opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className={`text-sm font-medium ${achievement.earned ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>{achievement.title}</span>
                </div>
                {achievement.earned ? (
                  <span className="text-xs text-[var(--text-muted)]">{achievement.date}</span>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">Encrypted</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
