import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { TrendingUp, BookOpen } from 'lucide-react';

export default function TrainerAnalyticsPage() {
  const courseStats = [
    { name: 'Full-Stack Web Development', students: 45, completion: 62, avgScore: 78, engagement: 85 },
    { name: 'AI-Powered Business Automation', students: 32, completion: 45, avgScore: 82, engagement: 72 },
    { name: 'Cloud Architecture & DevOps', students: 19, completion: 28, avgScore: 75, engagement: 60 },
  ];

  const weeklyActivity = [
    { day: 'Mon', lessons: 12, quizzes: 4, submissions: 6 },
    { day: 'Tue', lessons: 18, quizzes: 7, submissions: 3 },
    { day: 'Wed', lessons: 15, quizzes: 5, submissions: 8 },
    { day: 'Thu', lessons: 22, quizzes: 8, submissions: 5 },
    { day: 'Fri', lessons: 20, quizzes: 6, submissions: 9 },
    { day: 'Sat', lessons: 8, quizzes: 2, submissions: 2 },
    { day: 'Sun', lessons: 5, quizzes: 1, submissions: 1 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Course Analytics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Insights into your course performance and student engagement.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value="96" icon="Users" color="#6366f1" change={12} index={0} />
        <StatCard label="Avg Completion" value="45%" icon="Target" color="#10b981" change={5} index={1} />
        <StatCard label="Avg Score" value="78%" icon="BarChart3" color="#f59e0b" change={3} index={2} />
        <StatCard label="Avg. Session Time" value="38m" icon="Clock" color="#ec4899" change={-2} index={3} />
      </div>

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--brand-500)]" /> Course Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {courseStats.map((course) => (
            <div key={course.name} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">{course.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Students', value: course.students, color: '#6366f1' },
                  { label: 'Completion', value: `${course.completion}%`, color: '#10b981' },
                  { label: 'Avg Score', value: `${course.avgScore}%`, color: '#f59e0b' },
                  { label: 'Engagement', value: `${course.engagement}%`, color: '#ec4899' },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-xl font-bold text-[var(--text-primary)]" style={{ color: metric.color }}>{metric.value}</p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" /> Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-around gap-4 px-4">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full rounded-t-sm bg-[var(--brand-500)]" style={{ height: `${day.lessons * 3}px` }} title={`${day.lessons} lessons`} />
                  <div className="w-full bg-emerald-500 rounded-sm" style={{ height: `${day.quizzes * 4}px` }} title={`${day.quizzes} quizzes`} />
                  <div className="w-full rounded-b-sm bg-amber-500" style={{ height: `${day.submissions * 3}px` }} title={`${day.submissions} submissions`} />
                </div>
                <span className="text-xs text-[var(--text-muted)]">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[var(--brand-500)]" /> Lessons</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-500" /> Quizzes</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-500" /> Submissions</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
