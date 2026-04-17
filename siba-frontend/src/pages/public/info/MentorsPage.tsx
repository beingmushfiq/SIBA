import { MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mentors");
        setMentors(response.data);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" />
            <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">Assembling Architects...</p>
          </div>
        ) : (
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
        )}
        {!loading && mentors.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20">
             <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">No Architects found in the records.</p>
           </div>
        )}
      </main>
    </div>
  );
}
