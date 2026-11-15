import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  sports: [
    { label: "Cricket", href: "/sports?category=CRICKET" },
    { label: "Football", href: "/sports?category=FOOTBALL" },
    { label: "Basketball", href: "/sports?category=BASKETBALL" },
    { label: "Athletics", href: "/sports?category=ATHLETICS" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070707] text-white overflow-hidden">
      {/* Background oversized watermark typography */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[15vw] font-black uppercase tracking-tighter text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none">
        KHEL SETU
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        
        {/* Top Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-12 border-b border-white/10 gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-[#FF4D12]/60 group-hover:bg-[#FF4D12]/15">
              <Trophy className="h-5 w-5 text-[#FF4D12]" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                KHEL <span className="text-[#FF4D12]">सेतु</span>
              </span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono-tag text-xs text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS STATUS: OPERATIONAL</span>
            <span className="text-white/20">|</span>
            <span className="text-neutral-400">PAN-INDIA SERVER NETWORK</span>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#FF4D12]">
              [ MISSION ]
            </p>
            <p className="mt-4 font-display text-xl font-bold text-white leading-snug">
              One Platform.<br />Every Athlete.<br />Every Opportunity.
            </p>
            <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
              Empowering grassroots talent, modernizing academies, and standardizing sports performance across India.
            </p>
          </div>

          <div>
            <h3 className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-400">
              [ 01 // PLATFORM ]
            </h3>
            <ul className="mt-6 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF4D12]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-400">
              [ 02 // SPORTS ]
            </h3>
            <ul className="mt-6 space-y-3">
              {footerLinks.sports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF4D12]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-400">
              [ 03 // SUPPORT ]
            </h3>
            <ul className="mt-6 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF4D12]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono-tag text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} KHEL सेतु. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF4D12]" />
            <span className="inline-block h-2 w-2 rounded-full bg-white" />
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="ml-2 text-neutral-300">Proudly built for Indian Sports</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
