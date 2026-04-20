import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  Trash2,
  Lock,
  CheckSquare
} from 'lucide-react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TRAINER' | 'STUDENT' | 'MENTOR';
  is_active: boolean;
  created_at: string;
  avatar?: string;
}

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });

  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    role: 'STUDENT'
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      const response = await api.get('/api/admin/users', { 
        params: { search: searchTerm } 
      });
      return response.data;
    }
  });

  const addUserMutation = useMutation({
    mutationFn: async (userData: typeof newUser) => {
      const response = await api.post('/api/admin/users', userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsAddModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'STUDENT' });
      alert('User created successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create user');
    }
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUserMutation.mutate(newUser);
  };

  const updateUserMutation = useMutation({
    mutationFn: async (data: { id: string; payload: typeof editUser }) => {
      const response = await api.put(`/api/admin/users/${data.id}`, data.payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsEditModalOpen(false);
      alert('User updated successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to update user');
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/api/admin/users/${id}/toggle-status`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Failed to change status');
    }
  });

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUserMutation.mutate({ id: selectedUser.id, payload: editUser });
    }
  };

  const bulkRoleMutation = useMutation({
    mutationFn: async (payload: { user_ids: string[]; role: string }) => {
      const response = await api.post('/api/admin/users/bulk-role', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setSelectedUserIds([]);
      alert('Bulk roles updated successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Bulk update failed');
    }
  });

  const toggleSelection = (id: string) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkRoleChange = (role: string) => {
    if (selectedUserIds.length === 0) return;
    bulkRoleMutation.mutate({ user_ids: selectedUserIds, role });
  };

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`/api/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      alert('User deleted successfully.');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Failed to delete user.');
    }
  });

  const handleDeleteUser = (user: IUser) => {
    if (confirm(`Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

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
          <Button 
            className="h-11 rounded-xl px-4 flex gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
        </div>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Create a new user account with specific permissions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter full name" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="user@siba.com" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Initial Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Minimum 8 characters" 
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>System Role</Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TRAINER">Trainer</SelectItem>
                  <SelectItem value="MENTOR">Mentor</SelectItem>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)}
                disabled={addUserMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={addUserMutation.isPending}
              >
                {addUserMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                    <div className="absolute -top-1 -left-1">
                      <Checkbox 
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={() => toggleSelection(user.id)}
                        className="bg-[var(--bg-secondary)] shadow-lg"
                      />
                    </div>
                  </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Access</span>
                        <Switch 
                          checked={user.is_active} 
                          onCheckedChange={() => toggleStatusMutation.mutate(user.id)}
                          disabled={toggleStatusMutation.isPending}
                        />
                      </div>
                      <button 
                        className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors"
                        onClick={() => alert(`Options for ${user.name}`)}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-1">{user.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-[var(--text-muted)]">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs truncate">{user.email}</span>
                        </div>
                      </div>
                      {!user.is_active && (
                        <Badge variant="danger" className="animate-pulse bg-red-500/20 text-red-500 border-red-500/30">Inactive</Badge>
                      )}
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
                      <button 
                        className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                        onClick={() => handleDeleteUser(user)}
                        disabled={deleteUserMutation.isPending}
                      >
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
      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Member Profile</DialogTitle>
            <DialogDescription>
              Update information and access level for this user.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUser} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                value={editUser.name}
                onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email" 
                value={editUser.email}
                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>System Role</Label>
              <Select 
                value={editUser.role} 
                onValueChange={(value) => setEditUser({...editUser, role: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TRAINER">Trainer</SelectItem>
                  <SelectItem value="MENTOR">Mentor</SelectItem>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                disabled={updateUserMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bulk Action Bar */}
      {selectedUserIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10">
          <Card className="bg-[var(--bg-primary)] border-[var(--brand-500)] shadow-2xl overflow-hidden min-w-[320px] md:min-w-[600px]">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-500)]/10 flex items-center justify-center text-[var(--brand-500)]">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">
                    {selectedUserIds.length} members selected
                  </p>
                  <button 
                    onClick={() => setSelectedUserIds([])}
                    className="text-xs text-[var(--brand-500)] hover:underline"
                  >
                    Clear selection
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] font-medium">Bulk Change Role:</span>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-[10px] px-2"
                    onClick={() => handleBulkRoleChange('STUDENT')}
                    disabled={bulkRoleMutation.isPending}
                  >
                    Student
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-[10px] px-2 text-blue-500 border-blue-500/30"
                    onClick={() => handleBulkRoleChange('TRAINER')}
                    disabled={bulkRoleMutation.isPending}
                  >
                    Trainer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-[10px] px-2 text-purple-500 border-purple-500/30"
                    onClick={() => handleBulkRoleChange('MENTOR')}
                    disabled={bulkRoleMutation.isPending}
                  >
                    Mentor
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-[10px] px-2 text-red-500 border-red-500/30"
                    onClick={() => handleBulkRoleChange('ADMIN')}
                    disabled={bulkRoleMutation.isPending}
                  >
                    Admin
                  </Button>
                </div>
                {bulkRoleMutation.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-500)] ml-2" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
