import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  Mail, 
  Calendar,
  Loader2,
  Edit,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TRAINER' | 'STUDENT' | 'MENTOR';
  created_at: string;
  avatar?: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/admin/users');
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback or empty state
        return { users: [] };
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Loading user directory...</p>
      </div>
    );
  }

  const users = data?.users || [];
  const filteredUsers = users.filter((u: IUser) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'TRAINER': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'MENTOR': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">User Management</h1>
          <p className="text-[var(--text-secondary)] mt-1">Control access and manage platform participants.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all"
            />
          </div>
          <Button className="h-11 rounded-xl px-4 flex gap-2">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-primary)]">
            <Users className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No users found matching your search.</p>
          </div>
        ) : (
          filteredUsers.map((user: IUser) => (
            <Card key={user.id} className="overflow-hidden border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all duration-300 group bg-[var(--bg-secondary)]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-xl font-bold text-[var(--brand-500)] border border-[var(--border-primary)]">
                      {user.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--bg-secondary)] flex items-center justify-center ${user.role === 'ADMIN' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                      <Shield className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-1">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[var(--text-muted)]">
                      <Mail className="w-3 h-3" />
                      <span className="text-xs truncate">{user.email}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getRoleColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-secondary)] grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-bold tracking-tighter">Joined</span>
                      </div>
                      <p className="text-xs font-medium text-[var(--text-secondary)]">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
