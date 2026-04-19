import { Link, Navigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
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
  Loader2,
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
    name: "Nobin Bonik",
    role: "Architectural Lead",
    image: "/images/mentors/nobin.jpg",
    bio: "The strategist behind the 'soul' of SIBA brands. Architecting growth with surgical precision.",
  },
  {
    name: "Shahanewas Shawon",
    role: "Chief Technical Architect",
    image: "/images/mentors/shahanewas.jpg",
    bio: "Designing high-performance digital foundations and seamless automated workflows.",
  },
  {
    name: "Rasel Ahmed",
    role: "Financial & Data Scientist",
    image: "/images/mentors/rasel.jpg",
    bio: "Transforming raw data into strategic economic power and financial realism.",
  },
  {
    name: "Rumel Ahmmed",
    role: "Business Dev Lead",
    image: "/images/mentors/rumel.jpg",
    bio: "Sustainable revenue through deep analysis and elite retention frameworks.",
  },
];

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  const { data: catalogData } = useQuery({
    queryKey: ['public-courses'],
    queryFn: async () => {
      const response = await api.get('/api/courses');
      return response.data;
    }
  });

  const featuredCourses = catalogData?.courses?.slice(0, 3) || [];

  if (isLoading) {
    return <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--bg-primary)]">
       <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)]" />
    </div>;
  }

  // Redirect to dashboard if logged in
  if (isAuthenticated && user) {
     return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg-primary)] selection:bg-[var(--brand-500)] selection:text-white">
      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 flex flex-col items-center justify-center overflow-hidden">
        <div className="hero-spotlight" />
        
        {/* Floating Orbs for depth */}
        <div className="absolute top-[15%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] animate-float-slow delay-500" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left animate-slide-in-left">
            <div className="mb-6">
              <span className="text-xs font-black tracking-[0.4em] text-[var(--brand-500)] uppercase block mb-3">Modernizing Business Operation</span>
              <div className="h-1.5 w-16 bg-gradient-to-r from-[var(--brand-500)] to-transparent rounded-full" />
            </div>

             <h1 className="text-fluid-hero font-black tracking-tighter mb-2 sm:mb-4 lg:mb-6">
              <span className="text-[var(--text-primary)]">Sherazi IT</span><br />
              <span className="gradient-text">Business Academy.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl">
              Bangladesh&apos;s first Non-profit Academy specialized in <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--brand-500)] underline-offset-4">business development and exponential growth</span>. We modernize traditional systems through elite IT integration, scalable architectures, and automated revenue engines.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-500)] px-8 sm:px-12 text-white shadow-xl hover:shadow-[var(--brand-500)/20] min-h-[48px]">
                  Join the Academy
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-[3px] border-[var(--bg-primary)] overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i+12}`} 
                      className="w-full h-full object-cover"
                      alt="Student"
                      loading="lazy"
                    />
                  </div>
                ))}
                <div className="pl-4 sm:pl-6 text-[10px] sm:text-[11px] text-[var(--text-muted)] font-black uppercase tracking-widest">
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
      <section id="features" className="py-12 sm:py-16 md:py-20 relative border-t border-[var(--border-secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-600)] dark:text-[var(--brand-400)] mb-8">
              <Shield className="w-3.5 h-3.5" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-fluid-heading font-black text-[var(--text-primary)] mb-4 sm:mb-6 tracking-tighter">
              Built for <span className="gradient-text">Unstoppable</span> Growth.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              We&apos;ve engineered every feature to remove friction from your learning journey and accelerate your execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-5 sm:p-6 md:p-10 group soft-lift"
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
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 relative bg-[var(--bg-secondary)] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-active)] to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-8">
              <Zap className="w-3.5 h-3.5" />
              <span>The Flow Engine</span>
            </div>
            <h2 className="text-fluid-heading font-black text-[var(--text-primary)] mb-4 sm:mb-6 tracking-tighter">
              Mastery is a <span className="gradient-text">Sequence.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              Our 6-step propulsion system ensures you don&apos;t just &quot;learn&quot; — you master, execute, and scale.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 lg:gap-8">
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

      {/* ─── STRATEGIC FRAMEWORK ────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-5 sm:p-8 md:p-16 relative overflow-hidden group border-white/5">
             <div className="absolute inset-0 mesh-bg opacity-10 group-hover:opacity-20 transition-opacity" />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 relative z-10">
                <div className="space-y-5 sm:space-y-8">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-500)]/[0.08] text-[var(--brand-500)] text-[10px] font-black uppercase tracking-[0.3em] border border-[var(--brand-500)]/20">
                      Business Analyst Insight
                   </div>
                   <h2 className="text-fluid-subheading md:text-fluid-heading font-black tracking-tighter leading-[1.1] text-[var(--text-primary)]">
                      Ensuring trainees not only learn but <span className="gradient-text">successfully apply</span> strategies in real business environments.
                   </h2>
                   <p className="text-[var(--text-secondary)] text-lg leading-relaxed opacity-70 italic">
                      "SIBA bridges the gap between traditional practices and modern digital transformation by delivering hands-on, result-oriented training."
                   </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                   <div className="space-y-3">
                      <h3 className="text-sm font-black text-[var(--brand-500)] uppercase tracking-widest">Our Mission</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed opacity-80">
                         Empower Bangladeshi entrepreneurs, professionals, and SMEs with practical, technology-driven business development skills through specialized curriculum integration.
                      </p>
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-sm font-black text-[var(--brand-500)] uppercase tracking-widest">Our Vision</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed opacity-80">
                         To become a leading business training hub in Bangladesh, creating a new generation of smart, scalable, and system-driven businesses.
                      </p>
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-sm font-black text-[var(--brand-500)] uppercase tracking-widest">Operational Core</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed opacity-80">
                         Structured training programs, real-life case studies, and implementation-based learning. We integrate tools like POS, ERP, CRM, and e-commerce systems.
                      </p>
                   </div>
                </div>
             </div>
             <Shield className="absolute right-[-2%] bottom-[-5%] w-[450px] h-[450px] text-[var(--brand-500)] opacity-[0.02] rotate-12 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─────────────────────────────────── */}
      <section id="courses" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-8">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-fluid-heading font-black text-[var(--text-primary)] tracking-tighter leading-none">
                Featured <span className="gradient-text">Courses.</span>
              </h2>
            </div>
            <Link to="/courses">
              <Button size="lg" variant="ghost" className="group font-black text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Explore Full Catalog <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
          </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-10">
            {featuredCourses.length > 0 ? featuredCourses.map((course: any) => (
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
                <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-4 leading-tight group-hover:text-[var(--brand-500)] transition-colors line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-8 flex-1 leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border-secondary)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--brand-400)]" />
                      </div>
                      <div>
                        <p className="text-[var(--text-muted)] uppercase tracking-tighter text-[7px] font-black">Industry Experts</p>
                        <p className="text-[11px] font-black text-[var(--text-primary)] truncate max-w-[100px]">{course.trainer?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--text-muted)] uppercase tracking-tighter text-[7px] font-black">Investment</p>
                      <p className="text-xl font-black text-[var(--text-primary)] tracking-tight">
                        {course.price > 0 ? formatCurrency(course.price) : "Free"}
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
      <section id="mentors" className="py-12 sm:py-16 md:py-20 relative bg-[var(--bg-secondary)]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 mb-8">
              <Users className="w-3.5 h-3.5" />
              <span>Expert Council</span>
            </div>
            <h2 className="text-fluid-heading font-black text-[var(--text-primary)] mb-4 sm:mb-6 tracking-tighter">
              Guided by <span className="gradient-text">Practitioners.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
              Not academics — active industry practitioners currently scaling businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {mentorsList.map((mentor) => (
              <div key={mentor.name} className="glass-card p-5 sm:p-6 md:p-10 flex flex-col items-center text-center group soft-lift border-white/5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 sm:mb-6 md:mb-8 border-[3px] sm:border-[4px] md:border-[6px] border-[var(--bg-primary)] shadow-2xl group-hover:border-[var(--brand-500)]/30 transition-all duration-500">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" loading="lazy" />
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
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <div className="relative glass-card p-6 sm:p-8 md:p-12 lg:p-20 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border-white/10 shadow-[0_0_120px_rgba(99,102,241,0.15)] bg-gradient-to-b from-transparent to-[var(--brand-500)]/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-emerald-600/10 animate-pulse duration-[10s]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-brand/20">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-fluid-display font-black text-[var(--text-primary)] mb-6 sm:mb-8 lg:mb-10 tracking-[-0.05em] leading-[1.1]">
                      Stop Learning.<br />
                      Start <span className="gradient-text">Succeeding.</span>
                  </h2>
                  <p className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-12 font-medium opacity-80 leading-relaxed">
                    Join the elite 1% who are actually executing with high-performance business systems.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Link to="/register" className="w-full sm:w-auto">
                      <Button size="xl" className="w-full sm:w-auto rounded-xl sm:rounded-[1.5rem] px-8 sm:px-16 font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-500)] text-white hover:opacity-90 flex items-center justify-center border-none min-h-[48px]">
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
