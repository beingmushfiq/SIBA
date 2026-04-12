import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BarChart3,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Sequential course flow from Orientation to Certification with no shortcuts — real mastery guaranteed.",
    color: "#6366f1",
  },
  {
    icon: Target,
    title: "Practical Execution",
    description: "Hands-on projects, real-world scenarios, and live assignments — not just theory.",
    color: "#10b981",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Guidance",
    description: "Personalized learning paths, weakness detection, and adaptive pace powered by AI.",
    color: "#8b5cf6",
  },
  {
    icon: Award,
    title: "Skill Certification",
    description: "Earn certificates based on actual skill validation — not attendance.",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Business Tracking",
    description: "Track your business from idea to revenue with KPI dashboards and growth insights.",
    color: "#ec4899",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Get paired with industry mentors for guidance, feedback, and live support sessions.",
    color: "#3b82f6",
  },
];

const flowSteps = [
  { step: "01", title: "Orientation", desc: "Mindset & direction setting", icon: Target },
  { step: "02", title: "Core Learning", desc: "Concept mastery", icon: BookOpen },
  { step: "03", title: "Practical", desc: "Hands-on execution", icon: Zap },
  { step: "04", title: "Evaluation", desc: "Skill assessment", icon: BarChart3 },
  { step: "05", title: "Certification", desc: "Validated credentials", icon: Award },
  { step: "06", title: "Business", desc: "Launch & scale", icon: Rocket },
];

const mentorsList = [
  {
    name: "Rahat Sherazi",
    role: "Business Strategist",
    image: "https://i.pravatar.cc/150?u=rahat",
    bio: "Specializing in modernizing traditional businesses through elite IT integration.",
  },
  {
    name: "Sarah Ahmed",
    role: "Marketing Architect",
    image: "https://i.pravatar.cc/150?u=sarah",
    bio: "Helping brands scale to 7-figures using data-driven growth strategies.",
  },
  {
    name: "Tanvir Hossain",
    role: "System Engineer",
    image: "https://i.pravatar.cc/150?u=tanvir",
    bio: "Expert in automation and cloud infrastructure for scalable business OS.",
  },
  {
    name: "Mehedi Hasan",
    role: "Product Mentor",
    image: "https://i.pravatar.cc/150?u=mehedi",
    bio: "Bridging the gap between creative vision and practical market execution.",
  },
];

export default function HomePage() {
  const { data: catalogData } = useQuery({
    queryKey: ['public-courses'],
    queryFn: async () => {
      const response = await api.get('/api/courses');
      return response.data;
    }
  });

  const featuredCourses = catalogData?.courses?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--brand-500)] selection:text-white">
      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[85vh] pt-20 lg:pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden">
        <div className="hero-spotlight" />
        
        {/* Floating Orbs for depth */}
        <div className="absolute top-[15%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] animate-float-slow delay-500" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left animate-slide-in-left">
            <div className="mb-6">
              <span className="text-xs font-black tracking-[0.4em] text-[var(--brand-500)] uppercase block mb-3">Modernizing Business Operation</span>
              <div className="h-1.5 w-16 bg-gradient-to-r from-[var(--brand-500)] to-transparent rounded-full" />
            </div>

             <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[0.85] tracking-tighter mb-6 lg:mb-8">
              <span className="text-[var(--text-primary)]">Sherazi IT</span><br />
              <span className="gradient-text">Business Academy.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 lg:mb-8 max-w-xl">
              Bangladesh&apos;s first Non-profit Academy specialized in <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--brand-500)] underline-offset-4">business development and exponential growth</span>. We modernize traditional systems through elite IT integration, scalable architectures, and automated revenue engines.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-500)] px-12 text-white shadow-xl hover:shadow-[var(--brand-500)/20]">
                  Join the Academy
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-[3px] border-[var(--bg-primary)] overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i+12}`} 
                      className="w-full h-full object-cover"
                      alt="Student" 
                    />
                  </div>
                ))}
                <div className="pl-6 text-[11px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                  <span className="text-[var(--text-primary)]">500+ Experts</span> Already Scaling.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video/Mockup Space */}
          <div className="relative animate-slide-in-right delay-200">
            <div className="relative z-20 group">
              <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-black/5 dark:bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10]">
                <iframe 
                  className="absolute inset-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  src="https://www.youtube.com/embed/u31qwQUeGuM" 
                  title="SIBA Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-20 relative border-t border-[var(--border-secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-600)] dark:text-[var(--brand-400)] mb-8">
              <Shield className="w-3.5 h-3.5" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tighter">
              Built for <span className="gradient-text">Unstoppable</span> Growth.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              We&apos;ve engineered every feature to remove friction from your learning journey and accelerate your execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 sm:p-10 group soft-lift"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 shadow-lg group-hover:shadow-[var(--brand-500)/20]"
                    style={{ backgroundColor: `${feature.color}10`, border: `1px solid ${feature.color}25` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-loose opacity-70 group-hover:opacity-100 transition-opacity">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-20 relative bg-[var(--bg-secondary)] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-active)] to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-8">
              <Zap className="w-3.5 h-3.5" />
              <span>The Flow Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tighter">
              Mastery is a <span className="gradient-text">Sequence.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              Our 6-step propulsion system ensures you don&apos;t just &quot;learn&quot; — you master, execute, and scale.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative group" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="glass-card p-6 text-center h-full hover:bg-[var(--bg-card-hover)] transition-colors border-white/5">
                    <div className="text-[10px] font-black text-[var(--brand-400)] mb-5 opacity-40 group-hover:opacity-100 transition-opacity tracking-widest">{step.step}</div>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--brand-600)]/10 border border-[var(--brand-600)]/15 flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 text-[var(--brand-500)]" />
                    </div>
                    <h3 className="text-xs font-black text-[var(--text-primary)] mb-2 uppercase tracking-tighter leading-tight whitespace-nowrap">{step.title}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─────────────────────────────────── */}
      <section id="courses" className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-8">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-none">
                Featured <span className="gradient-text">Elite.</span>
              </h2>
            </div>
            <Link to="/courses">
              <Button size="lg" variant="ghost" className="group font-black text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Explore Full Catalog <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCourses.length > 0 ? featuredCourses.map((course: { id: string; category?: { name: string } }) => (
              <div key={course.id} className="glass-card flex flex-col group soft-lift overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden bg-[var(--bg-tertiary)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-900)] to-black opacity-30 group-hover:opacity-10 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-125 transition-transform duration-1000">
                    <Sparkles className="scale-[5]" />
                  </div>
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.2em]">
                       {course.category?.name || "Premium"}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-4 leading-tight group-hover:text-[var(--brand-500)] transition-colors line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-8 flex-1 leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border-secondary)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--brand-400)]" />
                      </div>
                      <div>
                        <p className="text-[var(--text-muted)] uppercase tracking-tighter text-[7px] font-black">Trainer</p>
                        <p className="text-[11px] font-black text-[var(--text-primary)] truncate max-w-[100px]">{course.trainer?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--text-muted)] uppercase tracking-tighter text-[7px] font-black">Investment</p>
                      <p className="text-xl font-black text-[var(--text-primary)] tracking-tight">
                        {course.price > 0 ? formatCurrency(course.price) : "Scholarship"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              [1, 2, 3].map((n) => (
                <div key={n} className="glass-card aspect-[16/10] animate-pulse bg-[var(--bg-secondary)] rounded-3xl" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── MENTORS ─────────────────────────────────────────── */}
      <section id="mentors" className="py-16 md:py-20 relative bg-[var(--bg-secondary)]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 mb-8">
              <Users className="w-3.5 h-3.5" />
              <span>Expert Council</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tighter">
              Guided by <span className="gradient-text">Practitioners.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              Not academics — active industry practitioners currently scaling businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorsList.map((mentor) => (
              <div key={mentor.name} className="glass-card p-6 sm:p-10 flex flex-col items-center text-center group soft-lift border-white/5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden mb-6 sm:mb-8 border-[4px] sm:border-[6px] border-[var(--bg-primary)] shadow-2xl group-hover:border-[var(--brand-500)]/30 transition-all duration-500">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" />
                </div>
                <h3 className="text-lg font-black text-[var(--text-primary)] mb-2 uppercase tracking-tighter">{mentor.name}</h3>
                <p className="text-[10px] font-black text-[var(--brand-500)] uppercase tracking-[0.2em] mb-6">{mentor.role}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-secondary)] transition-colors">{mentor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
            <div className="relative glass-card p-8 sm:p-12 lg:p-20 rounded-[2rem] sm:rounded-[3rem] border-white/10 shadow-[0_0_120px_rgba(99,102,241,0.15)] bg-gradient-to-b from-transparent to-[var(--brand-500)]/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-emerald-600/10 animate-pulse duration-[10s]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-brand/20">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-[var(--text-primary)] mb-8 lg:mb-10 tracking-[-0.05em] leading-[0.85]">
                      Stop Learning.<br />
                      Start <span className="gradient-text">Succeeding.</span>
                  </h2>
                  <p className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-12 font-medium opacity-80 leading-relaxed">
                    Join the elite 1% who are actually executing with high-performance business systems.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/register" className="w-full sm:w-auto">
                      <Button size="xl" className="w-full sm:w-auto rounded-[1.5rem] px-16 font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-500)] text-white hover:opacity-90 flex items-center border-none">
                        Access the Academy
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
