import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Loader2, Camera, Save, User } from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.post('/api/user/profile', formData);
      if (response.data.success) {
        setUser({ ...user, ...formData });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    try {
      const response = await api.post('/api/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setUser({ ...user, avatar_url: response.data.avatar_url });
        toast.success('Avatar updated!');
      }
    } catch (error) {
      toast.error('Avatar upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] flex items-center justify-center text-white shadow-lg shadow-[var(--brand-500)]/20">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Your Profile</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage your personal information and digital identity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Avatar */}
        <Card className="md:col-span-1 border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-[var(--bg-primary)] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback className="text-3xl font-black bg-[var(--brand-500)]/10 text-[var(--brand-500)]">
                  {getInitials(user?.name || '')}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[var(--brand-500)] text-white cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
              </label>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{user?.name}</h2>
              <p className="text-sm font-medium text-[var(--brand-500)] bg-[var(--brand-500)]/10 px-3 py-1 rounded-full mt-2 inline-block">
                {user?.role}
              </p>
            </div>
            
            <div className="w-full border-t border-[var(--border-primary)] mt-8 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Experience</span>
                <span className="font-bold text-[var(--text-primary)]">{user?.level || 'BEGINNER'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Member Since</span>
                <span className="font-bold text-[var(--text-primary)]">{new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Col: Form */}
        <Card className="md:col-span-2 border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="bg-[var(--bg-primary)] border-[var(--border-primary)] focus:ring-[var(--brand-500)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 234 567 890"
                    className="bg-[var(--bg-primary)] border-[var(--border-primary)] focus:ring-[var(--brand-500)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Email Address</Label>
                <Input 
                  id="email" 
                  value={user?.email || ''} 
                  disabled
                  className="bg-[var(--bg-tertiary)] border-[var(--border-primary)] opacity-60 cursor-not-allowed"
                />
                <p className="text-[10px] text-[var(--text-muted)]">Email changes must be requested through support.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  value={formData.bio} 
                  onChange={(e: any) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="bg-[var(--bg-primary)] border-[var(--border-primary)] focus:ring-[var(--brand-500)] resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shadow-lg shadow-[var(--brand-600)]/20 px-8 py-6 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
