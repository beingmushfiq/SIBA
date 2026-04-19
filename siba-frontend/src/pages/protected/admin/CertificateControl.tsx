import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Search, 
  ShieldAlert, 
  RotateCcw, 
  ExternalLink, 
  Loader2, 
  User, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle,
  PlusCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

interface ICertificate {
  id: string;
  certificate_no: string;
  status: 'issued' | 'revoked';
  issue_date: string;
  user?: { name: string; email: string };
  course?: { title: string };
}

export default function CertificateControl() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({
    user_id: '',
    course_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    certificate_no: ''
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-certificates', searchTerm],
    queryFn: async () => {
      const response = await api.get('/api/certificates', {
        params: { search: searchTerm }
      });
      return response.data;
    }
  });

  // Fetch users and courses for the modal
  const { data: usersData } = useQuery({
    queryKey: ['admin-users-list'],
    queryFn: async () => {
      const response = await api.get('/api/admin/users');
      return response.data;
    },
    enabled: isIssueModalOpen
  });

  const { data: coursesData } = useQuery({
    queryKey: ['admin-courses-list'],
    queryFn: async () => {
      const response = await api.get('/api/courses');
      return response.data;
    },
    enabled: isIssueModalOpen
  });

  const issueMutation = useMutation({
    mutationFn: async (certData: typeof newCert) => {
      const response = await api.post('/api/admin/certificates', certData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
      setIsIssueModalOpen(false);
      setNewCert({ user_id: '', course_id: '', issue_date: new Date().toISOString().split('T')[0], certificate_no: '' });
      alert('Certificate issued successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to issue certificate');
    }
  });

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.user_id || !newCert.course_id) {
        alert("Please select both a student and a course.");
        return;
    }
    issueMutation.mutate(newCert);
  };

  const revokeMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/api/admin/certificates/${id}/revoke`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
    }
  });

  const reissueMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/api/admin/certificates/${id}/reissue`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Fetching certificate registry...</p>
      </div>
    );
  }

  const certificates = data?.certificates || [];
  
  const filteredCerts = certificates.filter((cert: ICertificate) => 
    cert.certificate_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Certificate Control</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage global credentials and verify authenticity.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all"
            />
          </div>
          <Button 
            className="h-11 rounded-xl px-4 flex gap-2"
            onClick={() => setIsIssueModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Issue New</span>
          </Button>
        </div>
      </div>

      <Dialog open={isIssueModalOpen} onOpenChange={setIsIssueModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Manual Certificate</DialogTitle>
            <DialogDescription>
              Grant a certificate to a student manually for a specific course.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIssueCert} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Student</Label>
              <Select 
                value={newCert.user_id} 
                onValueChange={(value) => setNewCert({...newCert, user_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {(usersData?.users || []).map((u: any) => (
                    <SelectItem key={u.id} value={u.id}>{u.name} ({u.email})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Course</Label>
              <Select 
                value={newCert.course_id} 
                onValueChange={(value) => setNewCert({...newCert, course_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {(coursesData?.courses || []).map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input 
                id="issue_date" 
                type="date" 
                value={newCert.issue_date}
                onChange={(e) => setNewCert({...newCert, issue_date: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert_no">Custom Cert # (Optional)</Label>
              <Input 
                id="cert_no" 
                placeholder="Leave blank for auto-generation" 
                value={newCert.certificate_no}
                onChange={(e) => setNewCert({...newCert, certificate_no: e.target.value})}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsIssueModalOpen(false)}
                disabled={issueMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={issueMutation.isPending}
              >
                {issueMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Issuing...
                  </>
                ) : (
                  'Confirm Issuance'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 gap-4">
        {filteredCerts.length === 0 ? (
          <div className="text-center py-20 glass-card">
            <Award className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No certificates found matching your criteria.</p>
          </div>
        ) : (
          filteredCerts.map((cert: ICertificate) => (
            <Card key={cert.id} className="overflow-hidden border-[var(--border-secondary)]">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--border-secondary)]">
                  {/* Status/User Info */}
                  <div className="p-6 md:w-1/3 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={cert.status === 'issued' ? 'default' : 'danger'} className="rounded-full px-3">
                        {cert.status === 'issued' ? (
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Issued</span>
                        ) : (
                          <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Revoked</span>
                        )}
                      </Badge>
                      <span className="text-xs font-mono text-[var(--text-muted)]">{cert.certificate_no}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                        <User className="w-6 h-6 text-[var(--text-secondary)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--text-primary)] truncate">{cert.user?.name}</p>
                        <p className="text-xs text-[var(--text-muted)] truncate">{cert.user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course / Dates */}
                  <div className="p-6 md:w-1/3 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-[var(--brand-500)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-black">Course</p>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{cert.course?.title}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 md:w-1/3 flex items-center justify-end gap-3 bg-[var(--bg-secondary)]/30">
                    <Link to={`/verify-certificate?no=${cert.certificate_no}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" /> Verify
                      </Button>
                    </Link>
                    
                    {cert.status === 'issued' ? (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => {
                          if(confirm("Are you sure you want to REVOKE this certificate? This action is public immediately.")) {
                            revokeMutation.mutate(cert.id);
                          }
                        }}
                        disabled={revokeMutation.isPending}
                      >
                        <ShieldAlert className="w-4 h-4 mr-2" /> Revoke
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => reissueMutation.mutate(cert.id)}
                        disabled={reissueMutation.isPending}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" /> Reissue
                      </Button>
                    )}
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
