import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Shield, Bell, Save, Key, Loader2, Camera } from 'lucide-react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/api/admin/settings', { settings });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('logo', file);

    setUploading(true);
    try {
      const response = await api.post('/api/admin/settings/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setSettings({ ...settings, site_logo: response.data.url });
        toast.success('Logo updated!');
      }
    } catch (error) {
      toast.error('Logo upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Platform Settings</h1>
          <p className="text-[var(--text-secondary)] mt-1">Configure global platform behavior and identity.</p>
        </div>
        <Button 
          className="gap-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shadow-lg shadow-[var(--brand-600)]/20"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-[var(--brand-500)]" />
              Branding & General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload Section */}
            <div className="flex items-center gap-6 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)]">
              <div className="relative group">
                <div className="w-24 h-24 rounded-lg bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-primary)] flex items-center justify-center overflow-hidden">
                  {settings.site_logo ? (
                    <img src={settings.site_logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <Globe className="w-8 h-8 text-[var(--text-muted)] opacity-20" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-lg">
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
                </label>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">Platform Logo</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Recommend 512x512px. PNG or SVG preferred.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 block">Platform Name</label>
                <input
                  type="text"
                  value={settings.site_name || ''}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 block">Contact Email</label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card className="border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Maintenance Mode</p>
                      <p className="text-xs text-[var(--text-muted)]">Temporarily disable public access.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, maintenance_mode: !settings.maintenance_mode })}
                      className={`w-12 h-7 rounded-full transition-all relative ${settings.maintenance_mode ? 'bg-amber-500' : 'bg-[var(--bg-tertiary)]'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settings.maintenance_mode ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Self Registration</p>
                      <p className="text-xs text-[var(--text-muted)]">Allow new students to create accounts.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, allow_registration: !settings.allow_registration })}
                      className={`w-12 h-7 rounded-full transition-all relative ${settings.allow_registration !== false ? 'bg-emerald-500' : 'bg-[var(--bg-tertiary)]'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settings.allow_registration !== false ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
               </div>

                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 block">Max Enrollments per Course</label>
                   <input
                      type="number"
                      value={settings.max_enrollments || 100}
                      onChange={(e) => setSettings({ ...settings, max_enrollments: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
                   />
                </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-[var(--border-primary)] bg-[var(--bg-secondary)] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              Automations & Social
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                   <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Email Notifications</p>
                      <p className="text-xs text-[var(--text-muted)]">Send alerts for enrollments.</p>
                   </div>
                   <button
                      onClick={() => setSettings({ ...settings, email_notifications: !settings.email_notifications })}
                      className={`w-12 h-7 rounded-full transition-all relative ${settings.email_notifications ? 'bg-purple-500' : 'bg-[var(--bg-tertiary)]'}`}
                   >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settings.email_notifications ? 'left-6' : 'left-1'}`} />
                   </button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                   <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Auto-Approve Courses</p>
                      <p className="text-xs text-[var(--text-muted)]">Skip manual trainer review.</p>
                   </div>
                   <button
                      onClick={() => setSettings({ ...settings, auto_approve_courses: !settings.auto_approve_courses })}
                      className={`w-12 h-7 rounded-full transition-all relative ${settings.auto_approve_courses ? 'bg-purple-500' : 'bg-[var(--bg-tertiary)]'}`}
                   >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settings.auto_approve_courses ? 'left-6' : 'left-1'}`} />
                   </button>
                </div>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 block">LinkedIn URL</label>
                   <input
                      type="text"
                      value={settings.linkedin_url || ''}
                      onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
                      placeholder="https://linkedin.com/company/siba"
                   />
                </div>
                <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 block">Facebook URL</label>
                   <input
                      type="text"
                      value={settings.facebook_url || ''}
                      onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
                      placeholder="https://facebook.com/siba.academy"
                   />
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
