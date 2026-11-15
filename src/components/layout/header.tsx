"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, Trophy, Search, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-2xl py-0"
          : "border-b border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md py-1"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-[#FF4D12]/60 group-hover:bg-[#FF4D12]/10 group-hover:shadow-[0_0_20px_-3px_rgba(255,77,18,0.4)]">
            <Trophy className="h-4 w-4 text-[#FF4D12] transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#FF4D12] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white/95">
              KHEL <span className="text-[#FF4D12]">सेतु</span>
            </span>
            <span className="font-mono-tag text-[9px] font-medium tracking-widest text-neutral-400 uppercase -mt-1 hidden sm:block">
              Sports Tech Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">
          {NAVIGATION.main.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-full",
                  isActive
                    ? "text-white bg-white/10 shadow-inner"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#FF4D12]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search & Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/tournaments">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:border-[#FF4D12]/40 hover:bg-[#FF4D12]/10 hover:text-white"
              aria-label="Search events"
            >
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center pl-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="scale-90">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#FF4D12]" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer with refined architectural menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-white/10 bg-[#0D0D0D]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              <div className="font-mono-tag text-[10px] uppercase tracking-widest text-[#FF4D12] mb-3">
                [ NAVIGATION MENU ]
              </div>
              {NAVIGATION.main.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all border",
                        isActive
                          ? "bg-white/10 border-[#FF4D12]/40 text-white"
                          : "border-white/5 text-neutral-400 hover:text-white hover:bg-white/5"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono-tag text-xs text-[#FF4D12]">0{idx + 1}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-50" />
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono-tag text-xs text-neutral-400">Account status</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
