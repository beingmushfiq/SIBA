import { Users, TrendingUp, Award, Globe, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Globe, label: "Operational Hubs", value: "45+" },
  { icon: Users, label: "Elite Operatives", value: "15K+" },
  { icon: Award, label: "Verified Diplomas", value: "4.2K+" },
  { icon: TrendingUp, label: "Ecosystem Value", value: "$6.8M+" },
];

const testimonials = [
  {
    name: "Nadia Khan",
    role: "Full-Stack Engineer",
    content: "SIBA's curriculum bridged the gap between basic coding and enterprise-grade deployment. I now architect autonomous lead systems for global clients.",
    avatar: "https://i.pravatar.cc/200?u=nadia",
    tag: "Autonomic Systems"
  },
  {
    name: "Farhan Ali",
    role: "Digital Specialist",
    content: "The certificate verification protocol is the absolute gold standard. My proficiency was validated instantly, leading to my current lead role.",
    avatar: "https://i.pravatar.cc/200?u=farhan",
    tag: "Credential Authority"
  },
  {
    name: "Omar K.",
    role: "Sovereign Architect",
    content: "The board mentorship changed my entire trajectory. Having Rahat guide my infrastructural launch was the highest ROI decision I've made.",
    avatar: "https://i.pravatar.cc/200?u=omar",
    tag: "Infrastructural Growth"
  }
];

export default function LearnersPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-32 overflow-hidden">
       {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />

      <main className="pt-16 sm:pt-20 lg:pt-28 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.4em] border border-[var(--brand-500)]/20 mb-8">
            Global Ecosystem
          </div>
          <h1 className="text-fluid-hero font-black mb-6 sm:mb-8 md:mb-10 tracking-tighter leading-[0.85]">
            The Global <span className="gradient-text">Tribe.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-70 font-medium">
            Ambition meets high-fidelity execution. We are the architects modernizing the legacy DNA of business.
          </p>
        </header>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mb-12 sm:mb-16 md:mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 sm:p-6 md:p-10 group hover:bg-[var(--bg-secondary)]/[0.6] transition-all duration-[var(--duration-normal)] border-transparent hover:border-[var(--brand-500)]/20">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-8 border border-[var(--border-primary)] group-hover:bg-[var(--brand-500)] group-hover:text-white transition-all group-hover:rotate-12">
                 <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter group-hover:translate-x-1 transition-transform">{stat.value}</div>
              <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-[0.2em] opacity-60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <section className="space-y-16">
           <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="space-y-4">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--brand-500)]">Proof of Work</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Radical Impact.</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-lg max-w-md opacity-60 font-medium italic">&ldquo;Professional transformations validated by cryptographic proof and real-world results.&rdquo;</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="glass-card p-6 sm:p-8 md:p-12 group hover:bg-[var(--bg-secondary)]/[0.8] transition-all duration-500 relative bg-white/[0.02]">
                   <Sparkles className="absolute top-10 right-10 w-10 h-10 text-[var(--brand-500)]/5 group-hover:text-[var(--brand-500)]/20 transition-colors" />
                   <div className="mb-10 min-h-[140px]">
                        <p className="text-[var(--text-primary)] text-lg font-medium leading-[1.6] italic opacity-85">
                        &ldquo;{t.content}&rdquo;
                        </p>
                   </div>
                   <div className="flex items-center gap-5 pt-8 border-t border-[var(--border-primary)]">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[var(--brand-500)] rounded-full blur-md opacity-20" />
                            <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-[var(--brand-500)] relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" alt={t.name} />
                        </div>
                        <div>
                            <div className="font-black text-lg tracking-tight text-[var(--text-primary)]">{t.name}</div>
                            <div className="text-[9px] text-[var(--brand-500)] font-black uppercase tracking-[0.2em] mt-1">{t.role}</div>
                        </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* HALL OF ACHIEVERS */}
        <section className="mt-16 sm:mt-24 md:mt-32 space-y-8 sm:space-y-12 md:space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">Elite Network</h2>
              <h3 className="text-fluid-heading font-black tracking-tighter">Hall of <span className="gradient-text">Achievers.</span></h3>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Sajib Ahmed", outcome: "3x Revenue Growth", hub: "Dhaka Hub" },
                { name: "Merin Jahan", outcome: "Automated SaaS Launch", hub: "Chittagong Hub" },
                { name: "Tanvir S.", outcome: "Enterprise Migration", hub: "Dubai Hub" },
                { name: "Elena R.", outcome: "Scale to $100K/mo", hub: "London Hub" },
                { name: "Arif Hossain", outcome: "Lead Engine Architect", hub: "Toronto Hub" },
                { name: "Zubair M.", outcome: "Systemic Optimization", hub: "Singapore Hub" },
                { name: "Nadia Khan", outcome: "Autonomic Infrastructure", hub: "New York Hub" },
                { name: "Farhan Ali", outcome: "Market Dominance", hub: "Sylhet Hub" }
              ].map((achiever, i) => (
                <div key={i} className="glass-card p-4 sm:p-6 md:p-8 group hover:border-[var(--brand-500)]/40 transition-all">
                   <div className="text-[10px] font-black text-[var(--brand-500)] mb-3 tracking-widest">{achiever.outcome}</div>
                   <div className="text-lg font-black text-[var(--text-primary)] mb-1">{achiever.name}</div>
                   <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-60">{achiever.hub}</div>
                </div>
              ))}
           </div>
        </section>

        {/* CTA SECTION */}
        <section className="mt-12 sm:mt-16 md:mt-24 relative group overflow-hidden rounded-2xl sm:rounded-[3rem] border border-[var(--border-primary)]">
           <div className="absolute inset-0 bg-[var(--bg-secondary)] group-hover:bg-[var(--bg-tertiary)] transition-colors duration-700" />
           <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-1 opacity-[0.03] pointer-events-none absolute inset-0">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="aspect-square bg-[var(--brand-500)] rounded-full animate-pulse" style={{ animationDelay: `${(i * 123) % 3000}ms` }} />
              ))}
           </div>
           
           <div className="relative z-10 text-center max-w-3xl mx-auto py-10 sm:py-16 px-4 sm:px-8 space-y-8 sm:space-y-12">
              <div className="w-20 h-20 rounded-3xl bg-[var(--bg-primary)] flex items-center justify-center mx-auto mb-8 border border-[var(--border-primary)] shadow-2xl group-hover:rotate-12 transition-transform">
                <MessageSquare className="w-8 h-8 text-[var(--brand-500)]" />
              </div>
              <div className="space-y-6">
                <h2 className="text-fluid-heading font-black tracking-tighter leading-none">Execute Like the 1%.</h2>
                <p className="text-[var(--text-secondary)] text-xl leading-relaxed opacity-70 font-medium">
                    The SIBA tribe is a high-velocity mesh network. We share proprietary logic, code, and resources to eliminate professional failure.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/register"
                  className="h-14 px-8 sm:h-16 sm:px-12 md:h-20 md:px-16 rounded-2xl sm:rounded-3xl bg-[var(--brand-500)] text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    Initiate Authority Request
                    <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
