import { useState, useEffect } from 'react';
import { Shield, Search, Award, CheckCircle2, XCircle, Calendar, Loader2, Download, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useLocation } from 'react-router-dom';

export default function CertificateVerificationPage() {
  const [certNumber, setCertNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'revoked'>('idle');
  interface ICertificate {
    user?: { name: string };
    course?: { title: string };
    issue_date: string;
    certificate_no: string;
  }

  const [result, setResult] = useState<ICertificate | null>(null);

  const autoVerify = async (no: string) => {
    setStatus('loading');
    try {
      const response = await api.get(`/api/certificate/verify/${no}`);
      setResult(response.data.certificate);
      if (response.data.status === 'revoked') {
        setStatus('revoked');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  };
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const no = params.get('no');
    if (no && no !== certNumber) {
      setCertNumber(no);
      autoVerify(no);
    }
  }, [location.search, autoVerify]);


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber) return;

    setStatus('loading');
    
    try {
      const response = await api.get(`/api/certificate/verify/${certNumber}`);
      setResult(response.data.certificate);
      
      if (response.data.status === 'revoked') {
        setStatus('revoked');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 overflow-hidden">
      {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />

      <main className="pt-16 sm:pt-20 lg:pt-28 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12 animate-reveal">
           <div className="inline-flex items-center justify-center p-5 rounded-3xl bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] border border-[var(--brand-500)]/20 mb-8 shadow-xl shadow-brand/5">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-fluid-hero font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter leading-[0.9]">
            Trust. <span className="gradient-text">Verified.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-70">
            Authenticated infrastructure for global skill validation. Enter a serial number to confirm individual credentials.
          </p>
        </header>

        <section className="max-w-[800px] mx-auto">
          <div className="glass-card p-4 md:p-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-500)]/20 to-transparent" />
             
             <form onSubmit={handleVerify} className="relative z-10 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--brand-500)] transition-colors duration-[var(--duration-fast)]" />
                    <input 
                        type="text" 
                        value={certNumber}
                        onChange={(e) => setCertNumber(e.target.value)}
                        placeholder="e.g. SIBA-2026-X8Y1"
                        className="w-full h-14 sm:h-16 md:h-20 pl-12 sm:pl-14 md:pl-16 pr-4 sm:pr-6 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] font-bold text-base sm:text-lg md:text-xl placeholder:text-[var(--text-muted)]/30 focus:outline-none focus:border-[var(--brand-500)] focus:ring-[8px] focus:ring-[var(--brand-500)]/5 transition-all outline-none"
                    />
                </div>

                <Button 
                   type="submit" 
                   disabled={status === 'loading'}
                   className="h-14 sm:h-16 md:h-20 px-6 sm:px-8 md:px-10 text-xs sm:text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/10"
                >
                   {status === 'loading' ? (
                     <Loader2 className="w-6 h-6 animate-spin" />
                   ) : (
                     <span className="flex items-center gap-3">
                        Initiate Verification
                        <ArrowRight className="w-4 h-4" />
                     </span>
                   )}
                </Button>
             </form>
          </div>

          <div className="mt-12">
             {status === 'success' && (
                <div className="glass-card p-5 sm:p-8 md:p-10 lg:p-14 border-emerald-500/20 bg-emerald-500/[0.02] shadow-2xl animate-reveal relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-[var(--duration-slow)]">
                      <Award className="w-[300px] h-[300px] text-emerald-500" />
                   </div>
                   
                   <div className="flex flex-col gap-12 relative z-10">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                         <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                               <CheckCircle2 className="w-3.5 h-3.5" />
                               Verified Credential
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">{result.user?.name}</h2>
                            <p className="text-xl font-medium text-[var(--text-secondary)] opacity-80">{result.course?.title}</p>
                         </div>
                         <Button className="h-14 px-8 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/10 active:scale-95 transition-all">
                            <Download className="w-4 h-4 mr-2" /> Download JSON / PDF
                         </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-[var(--border-secondary)]">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-primary)]">
                                <Calendar className="w-5 h-5 text-[var(--text-muted)]" />
                            </div>
                            <div>
                               <div className="text-[10px] uppercase font-black text-[var(--text-muted)] tracking-widest mb-1">Authenticated On</div>
                               <div className="font-bold text-lg">{new Date(result.issue_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-primary)]">
                                <Shield className="w-5 h-5 text-[var(--text-muted)]" />
                            </div>
                            <div>
                               <div className="text-[10px] uppercase font-black text-[var(--text-muted)] tracking-widest mb-1">Serial Authority</div>
                               <div className="font-bold text-lg font-mono tracking-tight">{result.certificate_no}</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {status === 'revoked' && (
                <div className="glass-card p-6 sm:p-8 md:p-12 lg:p-16 border-amber-500/20 bg-amber-500/[0.01] text-center space-y-8 animate-reveal">
                   <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
                    <AlertTriangle className="w-10 h-10 text-amber-500" />
                   </div>
                   <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">Status: Revoked</h3>
                    <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed opacity-80">This specific credential was invalidated by the SIBA Authority on safety or compliance grounds. It no longer represents active mastery.</p>
                   </div>
                   {result && (
                      <div className="pt-8 border-t border-[var(--border-secondary)]">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Original Subject</p>
                         <p className="font-bold text-[var(--text-primary)] text-lg">{result.user?.name}</p>
                      </div>
                   )}
                </div>
             )}

             {status === 'error' && (
                <div className="glass-card p-6 sm:p-8 md:p-12 lg:p-16 border-red-500/20 bg-red-500/[0.01] text-center space-y-8 animate-reveal">
                    <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20 shadow-2xl shadow-red-500/5">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                   <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tight">Invalid Record</h3>
                        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed opacity-80">The system could not identify a record matching that serial signature in our secure database.</p>
                   </div>
                   <Button variant="outline" onClick={() => setStatus('idle')} className="h-12 px-8 font-black uppercase tracking-widest text-[10px] rounded-xl border-[var(--border-primary)] hover:border-[var(--brand-500)] transition-all">Retry Entry</Button>
                </div>
             )}

             {status === 'idle' && (
                <div className="py-12 text-center text-[var(--text-muted)] animate-pulse">
                   <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30">Pending Input Infrastructure</p>
                </div>
             )}
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
           {[
             { num: "01", title: "Encrypted Hash", desc: "Every certificate contains a unique cryptographic hash, ensuring that its content cannot be altered post-issuance." },
             { num: "02", title: "Real-time API", desc: "Verification happens against our live production state, ensuring up-to-the-second accuracy of revocation status." },
             { num: "03", title: "Public Trust", desc: "SIBA Academy certificates are recognized globally as a benchmark for high-performance business integration skills." }
           ].map((item, idx) => (
             <div key={idx} className="space-y-6 group hover:translate-y-[-8px] transition-all duration-[var(--duration-normal)]">
                <div className="text-[var(--brand-500)] font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{item.num}</div>
                <h4 className="text-xl font-black uppercase tracking-tight">{item.title}</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed text-[15px] opacity-70">{item.desc}</p>
             </div>
           ))}
        </section>
      </main>
    </div>
  );
}
