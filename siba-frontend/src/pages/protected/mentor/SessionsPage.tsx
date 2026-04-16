import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { Video, Calendar, Clock, Plus, ExternalLink } from 'lucide-react';

export default function MentorSessionsPage() {
  const sessions = [
    { id: 1, title: '1-on-1 Business Strategy Review', student: 'Nadia Ahmed', date: '2026-04-18', time: '11:00 AM', duration: '30 min', status: 'upcoming', type: 'one-on-one' },
    { id: 2, title: 'Group Q&A: Growth Strategies', student: 'All Mentees', date: '2026-04-20', time: '3:00 PM', duration: '60 min', status: 'upcoming', type: 'group' },
    { id: 3, title: 'Business Plan Review', student: 'Karim Hassan', date: '2026-04-14', time: '10:00 AM', duration: '45 min', status: 'completed', type: 'one-on-one' },
    { id: 4, title: 'Pitch Deck Feedback', student: 'Fatima Sultana', date: '2026-04-10', time: '2:00 PM', duration: '30 min', status: 'completed', type: 'one-on-one' },
    { id: 5, title: 'Weekly Mentorship Sync', student: 'All Mentees', date: '2026-04-07', time: '4:00 PM', duration: '45 min', status: 'completed', type: 'group' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Mentoring Sessions</h1>
          <p className="text-[var(--text-secondary)] mt-1">Schedule and manage mentoring sessions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Schedule Session
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sessions" value={sessions.length} icon="Video" color="#8b5cf6" index={0} />
        <StatCard label="Upcoming" value={sessions.filter(s => s.status === 'upcoming').length} icon="Calendar" color="#f59e0b" index={1} />
        <StatCard label="Completed" value={sessions.filter(s => s.status === 'completed').length} icon="CheckCircle2" color="#10b981" index={2} />
        <StatCard label="1-on-1 Sessions" value={sessions.filter(s => s.type === 'one-on-one').length} icon="Users" color="#ec4899" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.filter(s => s.status === 'upcoming').length === 0 ? (
              <p className="text-center py-8 text-[var(--text-muted)]">No upcoming sessions.</p>
            ) : (
              sessions.filter(s => s.status === 'upcoming').map((session) => (
                <div key={session.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">{session.title}</h3>
                      <p className="text-xs text-[var(--text-muted)]">with {session.student}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${session.type === 'group' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                      {session.type === 'group' ? 'GROUP' : '1:1'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ExternalLink className="w-3.5 h-3.5" /> Join Session
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

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
                    <p className="text-xs text-[var(--text-muted)]">with {session.student}</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">DONE</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {session.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
