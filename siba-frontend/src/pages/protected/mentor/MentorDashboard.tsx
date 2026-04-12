import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Video, MessageSquare, GraduationCap, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

export default function MentorDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['mentor-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/mentor/dashboard');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)]" />
      </div>
    );
  }

  const metrics = data?.metrics || [];
  const assignments = data?.assignments || [];
  const sessions = data?.sessions || [];

  const iconMap: Record<string, any> = {
    Users: Users,
    Video: Video,
    MessageSquare: MessageSquare,
    GraduationCap: GraduationCap
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Mentor Portal</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Guide your assigned students and manage one-on-one strategy sessions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat: any) => {
          const Icon = iconMap[stat.icon] || Users;
          return (
            <Card key={stat.label} className="border-[var(--border-secondary)]">
              <CardContent className="p-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center">
                       <Icon className="w-6 h-6 text-[var(--brand-500)]" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
                       <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Roster */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Assigned Students</h2>
              <Badge variant="secondary">{assignments.length} Enrolled</Badge>
           </div>
           
           <div className="space-y-3">
              {assignments.length === 0 ? (
                <Card className="border-dashed border-2 py-12 text-center text-[var(--text-muted)]">
                   <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                   <p>No students assigned for mentorship yet.</p>
                </Card>
              ) : (
                assignments.map((assignment: any) => (
                  <Card key={assignment.id} className="hover:border-[var(--brand-500)]/30 transition-colors">
                    <CardContent className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
                             <AvatarFallback className="text-xs font-bold text-[var(--brand-500)]">
                                {getInitials(assignment.student.name)}
                             </AvatarFallback>
                          </Avatar>
                          <div>
                             <p className="text-sm font-bold text-[var(--text-primary)]">{assignment.student.name}</p>
                             <p className="text-xs text-[var(--text-muted)]">{assignment.student.email}</p>
                          </div>
                       </div>
                       <Button variant="secondary" size="sm">View Progress</Button>
                    </CardContent>
                  </Card>
                ))
              )}
           </div>
        </div>

        {/* Live Sessions Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)]">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-[var(--brand-400)]" />
                    Live Sessions
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 {sessions.length === 0 ? (
                    <div className="text-center py-8">
                       <p className="text-sm text-[var(--text-muted)] mb-4">No sessions scheduled for today.</p>
                       <Button variant="outline" className="w-full">Schedule Session</Button>
                    </div>
                 ) : (
                    <div className="space-y-3">
                       {sessions.map((session: any) => (
                          <div key={session.id} className="p-3 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
                             <p className="text-sm font-bold text-[var(--text-primary)]">{session.title}</p>
                             <p className="text-xs text-[var(--text-muted)]">{new Date(session.scheduled_at).toLocaleString()}</p>
                             <Button size="sm" className="w-full mt-2" variant="default">Join Call</Button>
                          </div>
                       ))}
                    </div>
                 )}
              </CardContent>
           </Card>


           <Card className="border-[var(--brand-500)]/20">
              <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[var(--brand-400)]" />
                    Feedback Center
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-[var(--text-muted)] mb-4 text-center">Receive notifications when students request review on their benchmarks.</p>
                 <Button variant="secondary" className="w-full">Open Activity Log</Button>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
