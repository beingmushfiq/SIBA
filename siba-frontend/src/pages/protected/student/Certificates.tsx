import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle2, ExternalLink, Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function format(dateStr: string) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Certificates() {
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Fetch data
  const { data: dashData, isLoading: dashLoading } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  const { data: certData, isLoading: certLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await api.get('/api/certificates');
      return response.data;
    }
  });

  // Claim mutation
  const claimMutation = useMutation({
    mutationFn: async (enrollmentId: string) => {
      const response = await api.post('/api/certificates/claim', { enrollment_id: enrollmentId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    }
  });

  if (dashLoading || certLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Loading your credentials...</p>
      </div>
    );
  }

  const certificates = certData?.certificates || [];
  const enrollments = dashData?.enrollments || [];

  // Completed courses that don't have a certificate yet
  const claimedCourseIds = new Set(certificates.map((c: any) => c.course_id));
  const claimable = enrollments.filter((enr: any) => enr.progress_percentage === 100 && !claimedCourseIds.has(enr.course.id));

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Certificates</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Your hard-earned accomplishments, verified and secure.
        </p>
      </div>

      {/* Claimable Section */}
      {claimable.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Ready to Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {claimable.map((enr: any) => (
              <Card key={enr.id} className="border-[var(--brand-500)]/30 bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--brand-500)]/5">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-500)]/20 flex items-center justify-center shrink-0">
                    <Award className="w-8 h-8 text-[var(--brand-500)]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-[var(--text-primary)]">{enr.course.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">100% Completion Reached</p>
                    <Button 
                      onClick={() => claimMutation.mutate(enr.id)} 
                      disabled={claimMutation.isPending && claimMutation.variables === enr.id}
                      className="shadow-brand"
                    >
                      {claimMutation.isPending && claimMutation.variables === enr.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        'Issue Certificate'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Earned Section */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Earned Certificates</h2>
        {certificates.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--border-secondary)] rounded-2xl bg-[var(--bg-secondary)]">
            <Award className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] font-medium">No certificates earned yet.</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Complete a course curriculum to unlock your credentials.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert: any) => (
              <Card key={cert.id} className="overflow-hidden group border-[var(--border-secondary)] hover:border-[var(--brand-500)]/50 transition-all duration-300">
                <div className="h-40 bg-[var(--bg-elevated)] p-6 flex flex-col justify-between border-b border-[var(--border-secondary)] relative">
                   <div className="absolute inset-0 bg-mesh opacity-5 group-hover:opacity-10 transition-opacity" />
                  <div className="flex justify-between items-start relative z-10">
                    <div className="px-3 py-1 bg-[var(--brand-500)]/10 text-[var(--brand-500)] text-xs font-bold rounded-full font-mono border border-[var(--brand-500)]/20">
                      {cert.certificate_no}
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[var(--text-primary)] font-serif text-2xl tracking-wide opacity-90">
                      Certificate of Completion
                    </p>
                  </div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{cert.course?.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Issued on {format(cert.issue_date || cert.created_at)}
                  </p>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => copyToClipboard(cert.certificate_no)}>
                       {copiedId === cert.certificate_no ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                       {copiedId === cert.certificate_no ? 'Copied' : 'Copy No.'}
                    </Button>
                    <Link to={`/verify-certificate?no=${cert.certificate_no}`} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" /> Verify
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
