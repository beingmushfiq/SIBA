import { BookOpen, Target, Zap, BarChart3, Award, Rocket, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Target,
    title: "Phase 01: Strategic Orientation",
    description: "Every journey begins with a fundamental re-alignment of objective. We sync your personal vision with scalable IT infrastructure and global market logic.",
    details: ["Goal Architecture", "Mindset Shift", "Ecosystem Launch"],
    color: "from-blue-600 to-indigo-700"
  },
  {
    icon: BookOpen,
    title: "Phase 02: Core Concept Integration",
    description: "Deep immersion into high-fidelity theoretical modules. Master the logic behind autonomous systems, enterprise automation, and elite IT stacking.",
    details: ["Structural Logic", "Stack Integration", "Data Frameworks"],
    color: "from-indigo-700 to-purple-700"
  },
  {
    icon: Zap,
    title: "Phase 03: Live execution environment",
    description: "Theory meets reality in a controlled high-stakes environment. Students architect and deploy real-world systems under expert situational guidance.",
    details: ["System Deployment", "Situational Labs", "Active Integration"],
    color: "from-purple-700 to-pink-700"
  },
  {
    icon: BarChart3,
    title: "Phase 04: Elite Performance Audit",
    description: "A continuous feedback loop that audits your ability to deliver measurable business outcomes. We benchmark against fortune-500 standards.",
    details: ["KPI Engineering", "Audit Trails", "Performance Benchmarks"],
    color: "from-pink-700 to-rose-700"
  },
  {
    icon: Award,
    title: "Phase 05: Cryptographic Validation",
    description: "Credentials earned through proof-of-work. Each certificate is an immutable record of skill mastery, secured on our private validation ledger.",
    details: ["Final Audit", "Badge Generation", "Credential Minting"],
    color: "from-rose-700 to-orange-700"
  },
  {
    icon: Rocket,
    title: "Phase 06: Sovereign Scale Operation",
    description: "Post-certification launch. We provide the infrastructure and direct architectural support to scale your operation or transition into an elite lead role.",
    details: ["Scale Infrastructure", "Direct Mentorship", "Operational Support"],
    color: "from-orange-700 to-emerald-700"
  }
];

export default function LearningProcessPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-32 overflow-hidden">
      {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[15%] left-[-5%] w-[500px] h-[500px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow" />

      <main className="pt-16 sm:pt-20 lg:pt-32 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.4em] border border-[var(--brand-500)]/20 mb-8">
            Transmission Protocol
          </div>
          <h1 className="text-fluid-hero font-black mb-6 sm:mb-8 md:mb-10 tracking-tighter leading-[0.85]">
            The <span className="gradient-text">Flow Engine.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto leading-relaxed opacity-70">
            A proprietary sequential transformation algorithm. We don&apos;t just distribute information; we architect professional sovereignty.
          </p>
        </header>

        <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-48">
          {steps.map((step, index) => (
            <section 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 group`}
            >
              <div className="flex-[1.2] w-full space-y-6 sm:space-y-8 md:space-y-10 group-hover:translate-y-[-10px] transition-transform duration-[var(--duration-slow)]">
                <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${step.color} text-white shadow-2xl flex items-center justify-center p-5 transform group-hover:rotate-12 transition-transform duration-[var(--duration-slow)]`}>
                  <step.icon className="w-full h-full" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-fluid-subheading sm:text-fluid-heading font-black text-[var(--text-primary)] tracking-tight leading-none">{step.title}</h2>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl opacity-75">
                    {step.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-4 p-4 rounded-3xl bg-[var(--bg-secondary)]/[0.4] border border-[var(--border-primary)] group/item hover:border-[var(--brand-500)]/30 transition-all">
                      <div className="w-8 h-8 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--brand-500)] group-hover/item:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-[0.03] blur-[100px] rounded-full`} />
                <div className="relative aspect-video rounded-2xl sm:rounded-[3rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-2xl flex items-center justify-center overflow-hidden group/box">
                  <div className="absolute inset-0 mesh-bg opacity-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover/box:opacity-10 transition-opacity duration-[var(--duration-slow)]`} />
                  <div className="text-[20rem] font-black text-white/[0.03] select-none tracking-tighter group-hover/box:scale-110 transition-transform duration-[var(--duration-slow)]">
                    {index + 1}
                  </div>
                  <step.icon className="absolute w-32 h-32 text-[var(--text-primary)] opacity-5 group-hover/box:opacity-20 group-hover/box:scale-125 transition-all duration-[var(--duration-slow)]" />
                </div>
              </div>
            </section>
          ))}
        </div>
        
        <div className="mt-16 sm:mt-24 md:mt-40 lg:mt-64 relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-900)] rounded-2xl sm:rounded-[3rem] md:rounded-[4rem] group-hover:scale-[1.02] transition-transform duration-[var(--duration-slow)] shadow-[0_48px_120px_-24px_rgba(99,102,241,0.5)]" />
           <div className="absolute inset-0 mesh-bg opacity-20 pointer-events-none" />
           
           <div className="relative p-6 sm:p-8 md:p-16 lg:p-24 text-white text-center space-y-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Architect your future</h3>
                <h4 className="text-fluid-heading font-black tracking-tighter leading-none">Ready to Initiate<br />the Engine?</h4>
              </div>
              <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed font-medium">
                Join our elite ecosystem and master the high-stakes world of autonomous business operations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/register" className="h-14 px-8 sm:h-16 sm:px-12 md:h-20 md:px-16 rounded-2xl sm:rounded-3xl bg-white text-[var(--brand-600)] text-[11px] font-black uppercase tracking-[0.3em] hover:scale-[1.05] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3">
                    Start Process
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="h-14 px-8 sm:h-16 sm:px-12 md:h-20 md:px-16 rounded-2xl sm:rounded-3xl bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/20 transition-all flex items-center justify-center">
                    Review Tracks
                </Link>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
