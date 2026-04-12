import { Rocket, Target, Shield, Zap, Award, Globe, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Target, title: "Tactical Precision", text: "Every module is engineered for surgical-grade business integration, avoiding generic multi-purpose fluff." },
  { icon: Zap, title: "Execution Logic", text: "Pedagogy centered around real-world high-fidelity building. We prioritize functional output over theoretical noise." },
  { icon: Shield, title: "Verified Competence", text: "A SIBA credential is the industry benchmark for verified skill mastery, secured by cryptographic validation." },
  { icon: Heart, title: "Global Brotherhood", text: "Joining SIBA means entering a lifelong ecosystem of elite entrepreneurs, hackers, and operation architects." },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 overflow-hidden">
      {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />

      <main className="pt-24 lg:pt-32 px-6 max-w-7xl mx-auto relative z-10">
        <section className="flex flex-col lg:flex-row items-center gap-20 mb-24">
          <div className="flex-[1.2] space-y-10 animate-reveal">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.3em] border border-[var(--brand-500)]/20 shadow-xl shadow-brand/5">
                Authority Infrastructure
             </div>
             <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
                The SIBA <span className="gradient-text">Protocol.</span>
             </h1>
             <p className="text-[var(--text-secondary)] text-xl leading-relaxed max-w-xl opacity-70">
                Founded to bridge the radical gap between legacy operations and elite IT automation. We architect the future of business intelligence.
             </p>
             
             <div className="flex flex-wrap gap-16 pt-8">
                <div>
                   <div className="text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-1">2021</div>
                   <div className="text-[10px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Engine Initiation</div>
                </div>
                <div>
                   <div className="text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-1">12K<span className="text-[var(--brand-500)]">+</span></div>
                   <div className="text-[10px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Verified Members</div>
                </div>
                <div>
                   <div className="text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-1">45<span className="text-[var(--brand-500)]">+</span></div>
                   <div className="text-[10px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Nations Reached</div>
                </div>
             </div>
          </div>

          <div className="flex-1 relative w-full aspect-[4/5] max-w-lg group">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-500)] to-indigo-600 rounded-[3rem] rotate-6 opacity-[0.03] animate-pulse" />
             <div className="absolute inset-x-0 bottom-[-5%] h-[150%] bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent pointer-events-none z-10" />
             <div className="relative h-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[3rem] -rotate-3 overflow-hidden shadow-2xl flex items-center justify-center p-12 transition-transform duration-[var(--duration-slow)] group-hover:rotate-0">
                <div className="absolute inset-0 mesh-bg opacity-20" />
                <Rocket className="w-64 h-64 text-[var(--brand-500)] opacity-5 absolute group-hover:scale-110 transition-transform duration-[var(--duration-slow)]" />
                <div className="relative text-center space-y-6 z-10">
                   <div className="w-20 h-20 rounded-3xl bg-[var(--brand-500)] shadow-2xl shadow-brand/20 flex items-center justify-center mx-auto mb-8 border border-white/20">
                    <Globe className="w-10 h-10 text-white" />
                   </div>
                   <h3 className="text-3xl font-black tracking-tight leading-none text-[var(--text-primary)]">Global Infrastructure.</h3>
                   <p className="text-[var(--text-secondary)] text-sm font-medium leading-[1.6] opacity-70">"Scaling professional systems across 45 countries, helping businesses dominate their local markets through IT integration."</p>
                </div>
             </div>
          </div>
        </section>

        <section className="mb-24">
           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--brand-500)]">Operational Values</h2>
                <h3 className="text-5xl font-black tracking-tight">The DNA of Excellence.</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-lg max-w-md opacity-60 font-medium">Four high-fidelity principles that drive every module, interaction, and system we build.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {values.map((v, i) => (
                <div key={i} className="glass-card p-12 group hover:bg-[var(--bg-secondary)] transition-all duration-[var(--duration-normal)] border-transparent hover:border-[var(--brand-500)]/20 shadow-none hover:shadow-2xl">
                   <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] group-hover:bg-[var(--brand-500)] flex items-center justify-center border border-[var(--border-primary)] transition-all duration-[var(--duration-normal)] mb-10 group-hover:rotate-6">
                    <v.icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                   </div>
                   <h4 className="text-xl font-black mb-4 tracking-tight">{v.title}</h4>
                   <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed opacity-70">{v.text}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="p-10 md:p-16 rounded-[3rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] relative overflow-hidden group">
           <div className="absolute inset-0 mesh-bg opacity-10 group-hover:opacity-20 transition-opacity" />
           <div className="max-w-4xl space-y-12 relative z-10">
              <div className="w-16 h-px bg-[var(--brand-500)]" />
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)]">
                &ldquo;We don&apos;t just sell modules; we architect radical transformations in human capability.&rdquo;
              </h2>
              <div className="flex items-center gap-6">
                 <div className="relative">
                    <div className="absolute inset-0 bg-[var(--brand-500)] rounded-full blur-lg opacity-20" />
                    <img src="https://i.pravatar.cc/200?u=rahat" className="w-20 h-20 rounded-full border-2 border-[var(--brand-500)] relative z-10 grayscale hover:grayscale-0 transition-all duration-[var(--duration-slow)]" alt="Founder" />
                 </div>
                 <div>
                    <div className="font-black text-2xl tracking-tighter">Mohammad Rahat Sherazi</div>
                    <div className="text-[10px] text-[var(--brand-500)] font-black uppercase tracking-[0.3em] mt-1">Founder & Chief Architect, SIBA Academy</div>
                 </div>
              </div>
           </div>
           <Award className="absolute right-[-2%] bottom-[-5%] w-[450px] h-[450px] text-[var(--brand-500)] opacity-[0.02] rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-[var(--duration-slow)]" />
        </section>

        <section className="mt-24 text-center animate-reveal">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--brand-500)] mb-6">Join the Elite</h3>
            <h4 className="text-4xl md:text-6xl font-black tracking-tight mb-12">Become Part of the<br />Legacy Today.</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/register" className="h-16 px-12 rounded-2xl bg-[var(--brand-500)] text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-brand/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3">
                    Enroll in Cohort
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="h-16 px-12 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[var(--bg-tertiary)] transition-all flex items-center justify-center">
                    Explore Ecosystem
                </Link>
            </div>
        </section>
      </main>
    </div>
  );
}
