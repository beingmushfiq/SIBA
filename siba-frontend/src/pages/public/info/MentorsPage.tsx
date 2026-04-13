import { MessageCircle, Star, Sparkles } from "lucide-react";

const mentors = [
  {
    name: "Nobin Bonik",
    role: "Architectural Lead & Growth Strategist",
    image: "/images/mentors/nobin.jpg", // Anonymous mask style
    expertise: ["Brand Strategy Architect", "Business Architect", "Performance Marketing & Growth Lead"],
    bio: "The mastermind behind brand soul and rapid growth trajectory. Nobin architectures brand identity and rapid growth trajectories with surgical precision.",
    stats: { students: "1.2K", rating: "5.0", experience: "8Y" },
    links: { whatsapp: "8801846044470" }
  },
  {
    name: "Shahanewas Shawon",
    role: "Chief Technical Architect",
    image: "/images/mentors/shahanewas.jpg",
    expertise: ["Digital Infrastructure Specialist", "Software and Technical Architect", "Automation Design"],
    bio: "Architecting the invisible systems that power modern enterprise. Shahanewas builds high-performance digital foundations and seamless automated workflows.",
    stats: { students: "900", rating: "4.9", experience: "7Y" },
    links: { whatsapp: "8801770921384" }
  },
  {
    name: "Rasel Ahmed",
    role: "Financial & Data Scientist",
    image: "/images/mentors/rasel.jpg",
    expertise: ["Economics Specialist", "Financial Realist", "Data Analytics & Tracking Scientist"],
    bio: "Transforming raw numbers into strategic power. Rasel specializes in financial realism and surgical data precision for sustainable scaling.",
    stats: { students: "1.5K", rating: "5.0", experience: "10Y" },
    links: { whatsapp: "8801841011224" }
  },
  {
    name: "Rumel Ahmmed",
    role: "Business Dev & Retention Lead",
    image: "/images/mentors/rumel.jpg",
    expertise: ["Business Development", "Business Analysis", "Sales & Retention Strategist"],
    bio: "Driving sustainable revenue through deep analysis and elite retention frameworks. Rumel builds sustainable revenue engines by capturing and keeping growth.",
    stats: { students: "1.1K", rating: "4.8", experience: "6Y" },
    links: { whatsapp: "8801955240211" }
  },
  {
    name: "S.M. Faiaz Tamim",
    role: "Operational Clarity Lead",
    image: "/images/mentors/tamim.jpg",
    expertise: ["Operations & Automation Expert", "Technical Demonstrator", "Feedback Specialist"],
    bio: "Bridging technical complexity with operational clarity. Faiaz specializes in real-world demonstrations and feedback loops.",
    stats: { students: "850", rating: "4.9", experience: "5Y" },
    links: { whatsapp: "8801952387346" }
  },
  {
    name: "Mushfiqur Rahman",
    role: "Orientation & Context Architect",
    image: "/images/mentors/mushfiq.jpg",
    expertise: ["Operations & Automation Expert", "Context & Orientation Guide", "Case Study Analyst"],
    bio: "Navigating the complex landscape of business automation. Mushfiq specializes in situational orientation and deep_case study analysis.",
    stats: { students: "2.1K", rating: "5.0", experience: "9Y" },
    links: { whatsapp: "8801929324580" }
  }
];

export default function MentorsPage() {
  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg-primary)] pb-32 overflow-hidden">
      {/* Background Decorative elements */}
      <div className="mesh-bg opacity-30 pointer-events-none absolute inset-0" />
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[var(--brand-500)]/5 rounded-full blur-[120px] animate-float-slow pointer-events-none" />

      <main className="pt-16 sm:pt-20 lg:pt-32 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <header className="mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 animate-reveal">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.4em] border border-[var(--brand-500)]/20 mb-4 md:mb-8">
            Expert Authority
          </div>
          <h1 className="text-fluid-hero font-black mb-4 sm:mb-6 md:mb-10 tracking-tighter leading-[0.85] text-left">
            Meet the <span className="gradient-text">Architects.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-xl max-w-2xl leading-relaxed opacity-70">
            SIBA mentors are high-performance operators who have engineered, scaled, and automated real-world infrastructures.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {mentors.map((mentor, index) => (
            <div key={index} className="glass-card flex flex-col md:flex-row group hover:bg-[var(--bg-secondary)]/[0.6] transition-all duration-[var(--duration-normal)] overflow-hidden border-transparent hover:border-[var(--brand-500)]/20 shadow-none hover:shadow-2xl">
              <div className="w-full md:w-72 h-[240px] sm:h-[280px] md:h-auto relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={mentor.image} 
                  className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={mentor.name} 
                />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                   <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                    <Sparkles className="w-5 h-5" />
                   </div>
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-6 md:p-10 flex flex-col">
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-2 tracking-tight">{mentor.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-6 bg-[var(--brand-500)]" />
                   <p className="text-[var(--brand-500)] font-black uppercase tracking-[0.3em] text-[10px]">{mentor.role}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-6 md:space-y-8">
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--brand-500)] to-transparent rounded-full" />
                        <p className="text-[var(--text-secondary)] leading-relaxed font-medium italic pl-6 py-1 opacity-80 text-sm md:text-[15px]">
                        "{mentor.bio}"
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map(exp => (
                        <span key={exp} className="px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)] group-hover:border-[var(--brand-500)]/30 transition-colors">
                        {exp}
                        </span>
                    ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 md:gap-6 py-6 md:py-8 border-y border-[var(--border-secondary)]">
                    <div className="space-y-1">
                        <div className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tighter">{mentor.stats.students}</div>
                        <div className="text-[8px] md:text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Operatives</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xl md:text-2xl font-black text-[var(--text-primary)] flex items-center gap-1.5 tracking-tighter">
                            {mentor.stats.rating}
                            <Star className="w-3.5 h-3.5 md:w-4 h-4 fill-[var(--brand-500)] text-[var(--brand-500)]" />
                        </div>
                        <div className="text-[8px] md:text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Benchmark</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tighter">{mentor.stats.experience}</div>
                        <div className="text-[8px] md:text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest opacity-60">Velocity</div>
                    </div>
                    </div>

                    <div className="pt-4 relative z-30">
                    <a 
                      href={`https://wa.me/${mentor.links.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-[#25D366] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#25D366]/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer pointer-events-auto touch-target"
                    >
                        <MessageCircle className="w-4 h-4" /> Contact via WhatsApp
                    </a>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
