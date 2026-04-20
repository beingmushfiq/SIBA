import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { BarChart3, TrendingUp, Zap, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export default function AdminAnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const response = await api.get('/api/admin/analytics');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" />
        <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">Gathering Intelligence...</p>
      </div>
    );
  }

  const { stats, courseCompletionData, topPerformers, userGrowth } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Platform Analytics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Insights into platform performance and learner engagement.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Users" value={stats.activeUsers.toString()} icon="Users" color="#6366f1" change={15} index={0} />
        <StatCard label="Course Completion" value={`${stats.completionRate}%`} icon="Target" color="#10b981" change={8} index={1} />
        <StatCard label="Avg. Session Time" value={stats.avgSession} icon="Clock" color="#f59e0b" change={3} index={2} />
        <StatCard label="Certificates Issued" value={stats.certificatesIssued.toString()} icon="Award" color="#ec4899" change={22} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Completion Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--brand-500)]" />
              Course Completion Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseCompletionData.map((course: any) => (
              <div key={course.course} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--text-primary)] font-medium truncate max-w-[60%]">{course.course}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{course.rate}%</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] transition-all duration-1000"
                    style={{ width: `${course.rate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[var(--text-muted)]">
                  <span>{course.enrolled} enrolled</span>
                  <span>{course.completed} completed</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((student: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                    {i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{student.name}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--brand-400)]">{student.score}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">score</p>
                </div>
              </div>
            ))}
            {topPerformers.length === 0 && (
              <p className="text-center py-10 text-[var(--text-muted)] text-sm">No data available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            User Growth (Last 12 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-around gap-3 px-4">
            {userGrowth.map((point: any, i: number) => {
              const maxVal = Math.max(...userGrowth.map((p: any) => p.value), 1);
              const height = (point.value / maxVal) * 90 + 5;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-[var(--text-muted)]">{point.value}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all hover:from-emerald-500 hover:to-emerald-300 cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
