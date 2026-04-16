import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { Video, Plus, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

export default function TrainerSessionsPage() {
  const sessions = [
    { id: 1, title: 'React Advanced Patterns Q&A', course: 'Full-Stack Web Dev', date: '2026-04-18', time: '10:00 AM', duration: '60 min', attendees: 12, status: 'upcoming' },
    { id: 2, title: 'API Design Workshop', course: 'Full-Stack Web Dev', date: '2026-04-20', time: '2:00 PM', duration: '90 min', attendees: 8, status: 'upcoming' },
    { id: 3, title: 'ML Fundamentals Review', course: 'AI Business Automation', date: '2026-04-15', time: '11:00 AM', duration: '45 min', attendees: 15, status: 'completed' },
    { id: 4, title: 'Cloud Deployment Demo', course: 'Cloud Architecture', date: '2026-04-12', time: '3:00 PM', duration: '60 min', attendees: 6, status: 'completed' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Live Sessions</h1>
          <p className="text-[var(--text-secondary)] mt-1">Schedule and manage live training sessions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Schedule Session
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sessions" value={sessions.length} icon="Video" color="#6366f1" index={0} />
        <StatCard label="Upcoming" value={sessions.filter(s => s.status === 'upcoming').length} icon="Calendar" color="#f59e0b" index={1} />
        <StatCard label="Completed" value={sessions.filter(s => s.status === 'completed').length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="Total Attendees" value={sessions.reduce((s, se) => s + se.attendees, 0)} icon="Users" color="#ec4899" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.filter(s => s.status === 'upcoming').map((session) => (
              <div key={session.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{session.title}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{session.course}</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">UPCOMING</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {session.attendees}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> Start Session
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-500" /> Past Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.filter(s => s.status === 'completed').map((session) => (
              <div key={session.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{session.title}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{session.course}</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">COMPLETED</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {session.attendees} attended</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
