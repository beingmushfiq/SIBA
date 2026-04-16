import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Shield, Bell, Save, Key } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'SIBA - Sherazi IT Business Academy',
    siteDescription: 'Modernizing businesses through elite IT training and strategic growth execution.',
    contactEmail: 'admin@siba.academy',
    maxEnrollments: '100',
    certificatePrefix: 'SIBA',
    maintenanceMode: false,
    emailNotifications: true,
    autoApproveEnrollments: true,
    requireEmailVerification: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Platform Settings</h1>
          <p className="text-[var(--text-secondary)] mt-1">Configure global platform behaviour and policies.</p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-[var(--brand-500)]" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Platform Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)] resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Certificate & Enrollment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" />
              Certificates & Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Certificate Prefix</label>
              <input
                type="text"
                value={settings.certificatePrefix}
                onChange={(e) => handleChange('certificatePrefix', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">e.g., SIBA-2026-X8Y1</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Max Enrollments per Course</label>
              <input
                type="number"
                value={settings.maxEnrollments}
                onChange={(e) => handleChange('maxEnrollments', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'requireEmailVerification', label: 'Require Email Verification', desc: 'Users must verify email before accessing the platform.' },
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily disable public access to the platform.' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleChange(item.key, !(settings as any)[item.key])}
                  className={`w-12 h-7 rounded-full transition-all relative ${(settings as any)[item.key] ? 'bg-[var(--brand-500)]' : 'bg-[var(--bg-tertiary)] border border-[var(--border-primary)]'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${(settings as any)[item.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              Notifications & Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send email alerts for enrollments, certificates, etc.' },
              { key: 'autoApproveEnrollments', label: 'Auto-Approve Enrollments', desc: 'Automatically approve new student enrollments.' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleChange(item.key, !(settings as any)[item.key])}
                  className={`w-12 h-7 rounded-full transition-all relative ${(settings as any)[item.key] ? 'bg-[var(--brand-500)]' : 'bg-[var(--bg-tertiary)] border border-[var(--border-primary)]'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${(settings as any)[item.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
