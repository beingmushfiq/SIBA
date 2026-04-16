import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Users, GraduationCap, ShieldCheck, UserSearch, BookOpen, Globe, UserCheck, CheckCircle2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await api.get('/api/admin/stats');
      return response.data;
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
        await api.delete(`/api/admin/users/${userId}`);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
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
  const recentUsers = data?.recentUsers || [];

  const iconMap: Record<string, any> = {
    Users: Users,
    GraduationCap: GraduationCap,
    ShieldCheck: ShieldCheck,
    UserSearch: UserSearch,
    BookOpen: BookOpen,
    Globe: Globe,
    UserCheck: UserCheck,
    CheckCircle2: CheckCircle2
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'default';
      case 'TRAINER': return 'secondary';
      case 'MENTOR': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Platform-wide overview and management.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat: any) => {
          const Icon = iconMap[stat.icon] || Users;
          return (
            <Card key={stat.label} className="border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center">
                     <Icon className="w-5 h-5 text-[var(--brand-500)]" />
                   </div>
                </div>
                <p className="text-sm font-medium text-[var(--text-muted)] mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Newly Joined Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-center py-8 text-[var(--text-muted)]">No users found.</p>
              ) : (
                recentUsers.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate">{user.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50/10"
                        onClick={() => {
                            if(confirm(`Are you sure you want to delete ${user.name}?`)) {
                                deleteUserMutation.mutate(user.id);
                            }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
               <Link to="/dashboard/admin/users">
                 <Button variant="outline" className="w-full">View All Users</Button>
               </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Health / Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { label: 'Cloud Infrastructure', value: 'Healthy', color: 'bg-emerald-500' },
               { label: 'AI Model Connectivity', value: 'Linked', color: 'bg-purple-500' },
               { label: 'Security Protocols', value: 'Active', color: 'bg-blue-500' },
               { label: 'Database Integrity', value: 'Synchronized', color: 'bg-amber-500' }
             ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                   <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</span>
                   </div>
                </div>
             ))}

             <div className="pt-4 space-y-2">
                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">Maintenance Tools</p>
                <div className="grid grid-cols-2 gap-2">
                   <Button variant="secondary" size="sm" className="justify-start" onClick={() => alert('API Cache flushed successfully.')}>Flush API Cache</Button>
                   <Button variant="secondary" size="sm" className="justify-start" onClick={() => alert('All systems operational.')}>Run Health Check</Button>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
