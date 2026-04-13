import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Mail, Lock, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const redirectPath = await login({ email, password });
      navigate(redirectPath || '/dashboard/student');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg-primary)] flex items-center justify-center p-6 transition-colors duration-[var(--duration-normal)] relative overflow-hidden">
       {/* Background Elements */}
       <div className="mesh-bg opacity-40 pointer-events-none absolute inset-0" />
       <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />
       
       <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[100] flex items-center gap-4">
          <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <ThemeToggle />
       </div>

       <div className="w-full max-w-[420px] relative z-20 animate-reveal">
          <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col items-center text-center">
             <Link to="/" className="mb-8 hover:scale-105 transition-transform active:scale-95">
              <Logo className="scale-125" />
             </Link>
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-2 sm:mb-3 tracking-tighter">Welcome back.</h2>
             <p className="text-[var(--text-secondary)] text-[13px] font-medium max-w-[280px] leading-relaxed opacity-70">Enter your credentials to access your professional dashboard.</p>
          </div>
          
          <div className="glass-card p-6 sm:p-8 md:p-10 shadow-2xl border-white/5 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-500)]/[0.02] to-transparent pointer-events-none" />
             
             {error && (
                <div className="mb-8 bg-red-500/5 text-red-500 p-4 rounded-2xl flex items-start gap-3 text-[13px] border border-red-500/10 animate-shake">
                   <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                   <p className="font-semibold">{error}</p>
                </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Identity (Email)</label>
                   <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--brand-500)] transition-colors" />
                      <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         required
                         autoFocus
                         className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-[6px] focus:ring-[var(--brand-500)]/5 transition-all outline-none"
                         placeholder="e.g. name@company.com"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Control (Password)</label>
                   </div>
                   <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--brand-500)] transition-colors" />
                      <input 
                         type="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                         className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-[6px] focus:ring-[var(--brand-500)]/5 transition-all outline-none"
                         placeholder="••••••••"
                      />
                   </div>
                </div>

                <Button 
                   type="submit" 
                   size="lg"
                   className="w-full h-14 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-brand/20 mt-4 rounded-2xl"
                   disabled={loading}
                >
                   {loading ? (
                     <span className="flex items-center gap-2">
                        Authenticating...
                     </span>
                   ) : (
                     <span className="flex items-center gap-2">
                        Enter Workspace
                        <ArrowRight className="w-4 h-4" />
                     </span>
                   )}
                </Button>
             </form>

             <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 border-t border-[var(--border-secondary)] text-center relative z-10">
                <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">New to the Academy?</p>
                <Link to="/register" className="inline-flex items-center justify-center px-8 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand-500)] transition-all active:scale-95">
                   Create Membership
                </Link>
             </div>
          </div>
       </div>
    </div>
  );
}
