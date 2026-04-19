import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Award, Clock, ArrowRight, PlayCircle, 
  Download, Wifi, WifiOff, FileText, CheckCircle2 
} from 'lucide-react';

export default function StudentDashboard() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineResources] = useState([
    { id: '1', title: 'Neural Networks Basics', size: '15.4MB', type: 'PDF', downloaded: true },
    { id: '2', title: 'React Hooks Deep Dive', size: '124MB', type: 'VIDEO', downloaded: true },
    { id: '3', title: 'CSS Grid Masterclass', size: '45MB', type: 'VIDEO', downloaded: false },
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/student/dashboard');
      return response.data;
    }
  });

  if (isLoading) return <div className="flex h-64 items-center justify-center">Loading your dashboard...</div>;
  if (error) return <div className="text-red-500">Failed to load dashboard. Try reloading.</div>;

  const metrics = data?.metrics || { inProgress: 0, completed: 0, totalCertificates: 0 };
  const enrollments = data?.enrollments || [];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* Network Status Banner */}
      {!isOnline && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-amber-500" />
              <div>
                 <p className="font-bold text-amber-900">Synchronous Link Offline</p>
                 <p className="text-sm text-amber-700">You are currently in local storage mode. Access your downloaded modules below.</p>
              </div>
           </div>
           <Badge variant="outline" className="border-amber-500 text-amber-600 animate-pulse">OFFLINE MODE</Badge>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Neural Command Center</h1>
            <p className="text-[var(--text-secondary)] font-medium mt-1">Status: Operational • Linked to SIBA Mainframe</p>
         </div>
         <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm font-black uppercase tracking-widest">
            {isOnline ? <><Wifi className="w-4 h-4 text-emerald-500" /> Latency: 42ms</> : <><WifiOff className="w-4 h-4 text-red-500 text-pulse" /> Local Storage Active</>}
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative">
           <div className="absolute inset-0 bg-indigo-500/20 translate-x-2 translate-y-2 rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-all" />
           <Card className="bg-[var(--bg-secondary)] border-[var(--border-secondary)] rounded-3xl overflow-hidden relative overflow-hidden">
             <CardContent className="p-8">
               <BookOpen className="w-10 h-10 text-indigo-500 mb-4" />
               <p className="text-[var(--text-muted)] text-xs font-black uppercase tracking-widest mb-1">Active Streams</p>
               <p className="text-4xl font-black text-[var(--text-primary)]">{metrics.inProgress}</p>
             </CardContent>
           </Card>
        </div>
        <div className="group relative">
           <div className="absolute inset-0 bg-emerald-500/20 translate-x-2 translate-y-2 rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-all" />
           <Card className="bg-[var(--bg-secondary)] border-[var(--border-secondary)] rounded-3xl overflow-hidden">
             <CardContent className="p-8">
               <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" />
               <p className="text-[var(--text-muted)] text-xs font-black uppercase tracking-widest mb-1">Knowledge Mastered</p>
               <p className="text-4xl font-black text-[var(--text-primary)]">{metrics.completed}</p>
             </CardContent>
           </Card>
        </div>
        <div className="group relative">
           <div className="absolute inset-0 bg-amber-500/20 translate-x-2 translate-y-2 rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-all" />
           <Card className="bg-[var(--bg-secondary)] border-[var(--border-secondary)] rounded-3xl overflow-hidden">
             <CardContent className="p-8">
               <Award className="w-10 h-10 text-amber-500 mb-4" />
               <p className="text-[var(--text-muted)] text-xs font-black uppercase tracking-widest mb-1">Visual Proofs</p>
               <p className="text-4xl font-black text-[var(--text-primary)]">{metrics.totalCertificates}</p>
             </CardContent>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Streams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Current Learning Stacks</h2>
            <Link to="/courses">
              <Button variant="outline" size="sm" className="rounded-xl font-bold">Search Mainframe</Button>
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-3xl border-2 border-dashed border-[var(--border-secondary)]">
              <PlayCircle className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Buffer Empty</h3>
              <p className="text-[var(--text-secondary)] mb-6 text-sm">No knowledge streams found. Initialize a new link.</p>
              <Link to="/courses">
                <Button className="rounded-2xl px-10 h-12 bg-[var(--brand-500)] text-white font-black">START LINKING</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {enrollments.map((enr: any) => (
                <Card key={enr.id} className="overflow-hidden border-[var(--border-secondary)] bg-[var(--bg-secondary)]/50 backdrop-blur-xl hover:border-[var(--brand-500)]/50 transition-all rounded-3xl group">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-32 md:h-auto bg-[var(--bg-tertiary)] flex items-center justify-center relative">
                       <PlayCircle className="w-12 h-12 text-[var(--text-muted)] group-hover:text-[var(--brand-500)] group-hover:scale-110 transition-all" />
                    </div>
                    <CardContent className="p-8 flex-1">
                       <div className="flex items-start justify-between mb-4">
                          <div>
                             <Badge className="bg-[var(--brand-500)]/10 text-[var(--brand-500)] border-none mb-1 text-[9px] font-black uppercase tracking-widest">{enr.course.category?.name || 'Skill'}</Badge>
                             <h3 className="text-xl font-black text-[var(--text-primary)] leading-tight">{enr.course.title}</h3>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Integrity</p>
                             <p className="text-lg font-black text-[var(--brand-500)]">{enr.progress_percentage}%</p>
                          </div>
                       </div>
                       
                       <div className="h-2 w-full bg-[var(--bg-tertiary)] rounded-full mb-6 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-600)] shadow-[0_0_15px_var(--brand-500)44]" style={{ width: `${enr.progress_percentage}%` }} />
                       </div>

                       <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1.5 uppercase">
                             <Clock className="w-3 h-3" /> Last Active: {enr.status === 'COMPLETED' ? 'Finalized' : 'In Progress'}
                          </p>
                          <Link to={`/dashboard/student/learn/${enr.course.slug}`}>
                            <Button className="rounded-2xl gap-2 font-black italic bg-white text-black hover:bg-gray-100 uppercase tracking-tighter">
                               {enr.progress_percentage > 0 ? 'RESUME STREAM' : 'START LINK'} <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                       </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Offline & Downloads */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Local Vault</h2>
              <Download className="w-4 h-4 text-[var(--text-muted)]" />
           </div>

           <Card className="border-[var(--border-secondary)] bg-[var(--bg-primary)]/50 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-[var(--border-secondary)] p-6 bg-[var(--bg-secondary)]/50">
                 <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Offline Cache</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-[var(--border-secondary)]">
                    {offlineResources.map(res => (
                       <div key={res.id} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/30 transition-colors">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-xl ${res.downloaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'}`}>
                                {res.type === 'VIDEO' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                             </div>
                             <div>
                                <p className="text-xs font-bold text-[var(--text-primary)] line-clamp-1">{res.title}</p>
                                <p className="text-[9px] font-black tracking-widest text-[var(--text-muted)] uppercase">{res.size} • {res.type}</p>
                             </div>
                          </div>
                          {res.downloaded ? (
                             <Badge variant="outline" className="text-[8px] border-emerald-500/30 text-emerald-600 bg-emerald-500/5 px-1.5 h-5 font-black uppercase">Stored</Badge>
                          ) : (
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--brand-500)]"><Download className="w-4 h-4" /></Button>
                          )}
                       </div>
                    ))}
                 </div>
                 <div className="p-4 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-secondary)]">
                    <p className="text-[10px] text-[var(--text-muted)] italic font-medium leading-tight">Downloads are stored in your browser's IndexedDB for encrypted local access.</p>
                 </div>
              </CardContent>
           </Card>

           {/* AI Agent Recommendation */}
           <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-600)] text-white shadow-2xl shadow-[var(--brand-500)]/20 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-black uppercase tracking-tighter italic mb-2">SIBA Intelligence</h4>
              <p className="text-xs font-medium text-white/80 leading-relaxed mb-4">Based on your activity, I recommend linking to "Advanced Neural Routing" next.</p>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">Optimize Path</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
