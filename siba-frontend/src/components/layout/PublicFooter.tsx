import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, MapPin, Globe, ExternalLink, User, ArrowUpRight } from "lucide-react";

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
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ]
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-secondary)] pt-32 pb-16 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--brand-500)]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block transition-transform transition-all active:scale-95 duration-[var(--duration-fast)]">
              <Logo className="scale-125 origin-left" />
            </Link>
            <p className="text-[var(--text-secondary)] leading-[1.8] max-w-sm text-[15px] opacity-70">
              Bangladesh&apos;s first Non-profit Academy built to modernize professional systems through elite IT integration and scalable business architectures.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, ExternalLink, User, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-[14px] bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-500)] hover:border-[var(--brand-500)] hover:-translate-y-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-premium)]">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:px-8">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Resources</h4>
              <ul className="space-y-5">
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
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Academy</h4>
              <ul className="space-y-5">
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
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-40">Direct Contact</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-5 p-5 pr-8 rounded-3xl bg-[var(--bg-secondary)]/[0.5] border border-[var(--border-primary)] group hover:border-[var(--brand-500)]/30 hover:bg-[var(--bg-secondary)] transition-all duration-[var(--duration-normal)]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-400)] text-white flex items-center justify-center shrink-0 shadow-xl shadow-brand/20">
                  <Phone className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Elite Line</p>
                  <a href="tel:01929324580" className="text-lg font-black text-[var(--text-primary)] block tracking-tight">01929324580</a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 pr-8 rounded-3xl bg-[var(--bg-secondary)]/[0.5] border border-[var(--border-primary)] group hover:border-indigo-500/30 hover:bg-[var(--bg-secondary)] transition-all duration-[var(--duration-normal)]">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/20">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Our Office</p>
                  <p className="text-[13px] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                    4th Floor, House No. 13, Road No. 3/F,<br />Sector No. 9, Uttara, Dhaka-1230.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[var(--border-secondary)] flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em]">
            © {currentYear} SIBA. Sherazi IT. All Rights Reserved.
          </p>
          <div className="flex items-center gap-10">
            {links.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-[9px] font-black text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-[0.3em] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
