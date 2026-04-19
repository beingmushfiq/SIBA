import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, MapPin, Globe, ExternalLink, User, ArrowUpRight, MessageCircle } from "lucide-react";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { label: "Home", href: "/" },
      { label: "Process", href: "/learning-process" },
      { label: "Courses", href: "/courses" },
      { label: "Mentors", href: "/mentors" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Learners", href: "/learners" },
      { label: "Verification", href: "/verify-certificate" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ]
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-secondary)] pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[var(--brand-500)]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 mb-12 md:mb-16 lg:mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8 md:space-y-10">
            <Logo size="lg" className="origin-left transition-all active:scale-95 duration-[var(--duration-fast)]" />
            <p className="text-[var(--text-secondary)] leading-[1.8] max-w-sm text-sm md:text-[15px] opacity-70">
              Bangladesh&apos;s first Non-profit Academy built to modernize professional systems through elite IT integration and scalable business architectures.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { Icon: Globe, href: "https://sheraziit.com/" }, 
                { Icon: ExternalLink, href: "https://www.facebook.com/SheraziitofficiaI/" }, 
                { Icon: User, href: "/login" }, 
                { Icon: Mail, href: "mailto:contact@sheraziit.com" }
              ].map(({Icon, href}, i) => (
                <a key={i} href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[14px] bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-500)] hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-premium)] touch-target" aria-label={`Social link ${i + 1}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8 lg:px-8">
            <div className="space-y-5 sm:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Resources</h4>
              <ul className="space-y-3 sm:space-y-5">
                {links.platform.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-500)] transition-all flex items-center group">
                      {link.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-2 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-premium)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5 sm:space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Academy</h4>
              <ul className="space-y-3 sm:space-y-5">
                {links.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-500)] transition-all flex items-center group">
                      {link.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-2 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-premium)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Direct Contact</h4>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 pr-4 sm:pr-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-secondary)]/[0.5] border border-[var(--border-primary)] group hover:border-[var(--brand-500)]/30 hover:bg-[var(--bg-secondary)] transition-all duration-[var(--duration-normal)]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] text-white flex items-center justify-center shrink-0 shadow-xl shadow-brand/20">
                  <Phone className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Elite Line</p>
                  <div className="text-base sm:text-lg font-black text-[var(--text-primary)] block tracking-tight mb-1 sm:mb-2">01929324580</div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <a href="tel:01929324580" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--brand-500)] transition-colors">
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <div className="w-1 h-1 rounded-full bg-[var(--border-primary)]" />
                    <a href="https://wa.me/8801929324580" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#25D366] transition-colors">
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/q7AdUUHTWKfRf8q47" target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 pr-4 sm:pr-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-secondary)]/[0.5] border border-[var(--border-primary)] group hover:border-indigo-500/30 hover:bg-[var(--bg-secondary)] transition-all duration-[var(--duration-normal)]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/20">
                  <MapPin className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Our Office</p>
                  <p className="text-xs sm:text-[13px] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                    4th Floor, House No. 13, Road No. 3/F,<br className="hidden sm:inline" /><span className="sm:hidden">, </span>Sector No. 9, Uttara, Dhaka-1230.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-10 border-t border-[var(--border-secondary)] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8 pb-24 md:pb-0">
          <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-center md:text-left">
            © {currentYear} SIBA. Sherazi IT. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 sm:gap-10">
            {links.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-[9px] font-black text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
