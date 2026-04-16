import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Target, Zap, BarChart3 } from 'lucide-react';

export default function ProgressPage() {
  const courseProgress = [
    { name: 'Full-Stack Web Development', progress: 68, lessons: 24, completed: 16, quizzes: 4, quizzesDone: 3, timeSpent: '32h' },
    { name: 'Cloud Architecture & DevOps', progress: 15, lessons: 18, completed: 3, quizzes: 3, quizzesDone: 0, timeSpent: '6h' },
  ];

  const achievements = [
    { title: 'First Login', icon: '🎯', earned: true, date: '2026-03-01' },
    { title: 'Course Enrolled', icon: '📚', earned: true, date: '2026-03-02' },
    { title: 'First Quiz Passed', icon: '✅', earned: true, date: '2026-03-15' },
    { title: '50% Completion', icon: '🔥', earned: true, date: '2026-04-01' },
    { title: 'All Quizzes Ace', icon: '⭐', earned: false, date: null },
    { title: 'Course Completed', icon: '🏆', earned: false, date: null },
  ];

  const weeklyHours = [2, 4, 3, 5, 4, 6, 3];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Progress</h1>
        <p className="text-[var(--text-secondary)] mt-1">Track your learning milestones and achievements.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Courses Active" value={courseProgress.length} icon="BookOpen" color="#6366f1" index={0} />
        <StatCard label="Lessons Done" value={courseProgress.reduce((s, c) => s + c.completed, 0)} icon="CheckCircle2" color="#10b981" index={1} />
        <StatCard label="Time Invested" value="38h" icon="Clock" color="#f59e0b" index={2} />
        <StatCard label="Achievements" value={`${achievements.filter(a => a.earned).length}/${achievements.length}`} icon="Award" color="#ec4899" index={3} />
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--brand-500)]" /> Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {courseProgress.map((course) => (
            <div key={course.name} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{course.name}</h3>
                <span className="text-lg font-bold text-[var(--brand-400)]">{course.progress}%</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden mb-4">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] transition-all duration-1000" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{course.completed}/{course.lessons}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Lessons</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{course.quizzesDone}/{course.quizzes}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Quizzes</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{course.timeSpent}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Time Spent</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{Math.round(course.progress * 0.85)}%</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Avg Score</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Learning Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" /> Weekly Study Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-around gap-3 px-4">
              {weeklyHours.map((hours, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{hours}h</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 transition-all cursor-pointer"
                    style={{ height: `${(hours / 6) * 100}%` }}
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
              <Zap className="w-5 h-5 text-amber-500" /> Achievements
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
                  <span className="text-xs text-[var(--text-muted)]">Locked</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
