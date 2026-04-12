import { User, Globe, ExternalLink, MessageCircle, Star, Sparkles } from "lucide-react";

const mentors = [
  {
    name: "Rahat Sherazi",
    role: "Founder & Lead Strategist",
    image: "https://i.pravatar.cc/400?u=rahat",
    expertise: ["Business Automation", "Elite Leadership", "Infrastructural Logic"],
    bio: "Visionary entrepreneur dedicated to modernizing legacy business landscapes through strategic digital integration and elite situational performance systems.",
    stats: { students: "5.2K", rating: "5.0", experience: "12Y" }
  },
  {
    name: "Sarah Ahmed",
    role: "Growth Architect",
    image: "https://i.pravatar.cc/400?u=sarah",
    expertise: ["Consumer Psychology", "Growth Hacking", "Revenue Stacking"],
    bio: "Architecting high-conversion ecosystems. Sarah specializes in translating psychological triggers into automated revenue engines for global brands.",
    stats: { students: "3.8K", rating: "4.9", experience: "8Y" }
  },
  {
    name: "Tanvir Hossain",
    role: "CTO & Sovereign Engineer",
    image: "https://i.pravatar.cc/400?u=tanvir",
    expertise: ["Cloud Security", "Operational AI", "Stack Optimization"],
    bio: "Powerhouse engineer focused on building secure, sovereign, and fully autonomous infrastructures for modern enterprise-grade scalability.",
    stats: { students: "2.5K", rating: "4.9", experience: "10Y" }
  },
  {
    name: "Mehedi Hasan",
    role: "Elite Product Lead",
    image: "https://i.pravatar.cc/400?u=mehedi",
    expertise: ["Product Design", "Situational UX", "Market Dominance"],
    bio: "Bridging the gap between conceptual friction and market-ready products. Mehedi focuses on human-centric design with surgical efficiency.",
    stats: { students: "4.1K", rating: "5.0", experience: "9Y" }
  }
];

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-32 overflow-hidden">
      {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />

      <main className="pt-24 lg:pt-32 px-6 max-w-7xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 animate-reveal">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.4em] border border-[var(--brand-500)]/20 mb-8">
            Expert Authority
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85]">
            Meet the <span className="gradient-text">Architects.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-70">
            SIBA mentors are high-performance operators who have engineered, scaled, and automated real-world infrastructures.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {mentors.map((mentor, index) => (
            <div key={index} className="glass-card flex flex-col md:flex-row group hover:bg-[var(--bg-secondary)]/[0.6] transition-all duration-[var(--duration-normal)] overflow-hidden border-transparent hover:border-[var(--brand-500)]/20 shadow-none hover:shadow-2xl">
              <div className="w-full md:w-72 h-[420px] md:h-auto relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={mentor.image} 
                  className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={mentor.name} 
                />
                <div className="absolute top-6 left-6 z-20">
                   <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                    <Sparkles className="w-5 h-5" />
                   </div>
                </div>
              </div>

              <div className="flex-1 p-10 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-4xl font-black text-[var(--text-primary)] mb-2 tracking-tight">{mentor.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-6 bg-[var(--brand-500)]" />
                   <p className="text-[var(--brand-500)] font-black uppercase tracking-[0.3em] text-[10px]">{mentor.role}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--brand-500)] to-transparent rounded-full" />
                        <p className="text-[var(--text-secondary)] leading-relaxed font-medium italic pl-6 py-1 opacity-80 text-[15px]">
                        "{mentor.bio}"
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map(exp => (
                        <span key={exp} className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)] group-hover:border-[var(--brand-500)]/30 transition-colors">
                        {exp}
                        </span>
                    ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6 py-8 border-y border-[var(--border-secondary)]">
                    <div className="space-y-1">
                        <div className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">{mentor.stats.students}</div>
                        <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Operatives</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-black text-[var(--text-primary)] flex items-center gap-1.5 tracking-tighter">
                            {mentor.stats.rating}
                            <Star className="w-4 h-4 fill-[var(--brand-500)] text-[var(--brand-500)]" />
                        </div>
                        <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Benchmark</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">{mentor.stats.experience}</div>
                        <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Velocity</div>
                    </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                    <button className="flex-1 h-14 rounded-2xl bg-[var(--brand-500)] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <MessageCircle className="w-4 h-4" /> Secure Session
                    </button>
                    <div className="flex gap-2">
                        <button className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-500)] transition-all border border-[var(--border-primary)] active:scale-95">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-500)] transition-all border border-[var(--border-primary)] active:scale-95">
                            <Globe className="w-5 h-5" />
                        </button>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-20 p-12 md:p-20 glass-card border-dashed border-2 border-[var(--border-primary)] text-center group hover:border-[var(--brand-500)] transition-all duration-700">
           <div className="max-w-2xl mx-auto space-y-10">
                <div className="w-20 h-20 rounded-3xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-8 text-[var(--brand-500)] group-hover:rotate-12 transition-transform shadow-xl">
                    <ExternalLink className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-[var(--text-primary)]">Ready to Join the Board?</h2>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed opacity-70">
                    We are continuously scouting for high-performance operators with a radical track record to Join the SIBA elite board.
                    </p>
                </div>
                <button className="h-16 px-12 rounded-2xl border-2 border-[var(--brand-500)] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[var(--brand-500)] hover:text-white transition-all shadow-xl shadow-brand/5 active:scale-95">
                    Submit Authority Request
                </button>
           </div>
        </section>
      </main>
    </div>
  );
}
