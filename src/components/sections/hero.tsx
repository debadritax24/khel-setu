"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-36 border-b border-border">
      {/* Background ambient lighting and grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#FF4D12]/15 via-[#F28C28]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      {/* Precision corner crosshairs */}
      <div className="absolute top-6 left-6 font-mono-tag text-xs text-muted-foreground/40 select-none hidden lg:block">+ 28.6139° N / INDIA</div>
      <div className="absolute top-6 right-6 font-mono-tag text-xs text-muted-foreground/40 select-none hidden lg:block">SYS: LIVE +</div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-left">
          
          {/* Kicker badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-1.5 backdrop-blur-md shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF4D12] animate-ping" />
            <p className="font-mono-tag text-xs font-semibold tracking-wider text-foreground uppercase">
              Making a bridge for the sports ecosystem
            </p>
            <span className="text-muted-foreground/40">•</span>
            <span className="font-mono-tag text-[11px] text-[#F28C28] tracking-widest uppercase">
              [ 01 // OVERVIEW ]
            </span>
          </motion.div>

          {/* Main oversized headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8"
          >
            <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92]">
              KHEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D12] via-[#F28C28] to-[#FF7A00]">सेतु</span>
            </h1>
          </motion.div>

          {/* Secondary Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl max-w-3xl font-display"
          >
            One platform connecting athletes, academies &<br className="hidden sm:block" /> sponsors across India.
          </motion.h2>

          {/* Subtext Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A mobile-and-web sports ecosystem that helps grassroots athletes get discovered, academies run digitally, and sponsors find verified local talent.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-x-4"
          >
            <Button
              size="lg"
              asChild
              className="group relative h-14 rounded-full bg-[#FF4D12] px-8 text-base font-bold text-white shadow-[0_0_35px_-5px_rgba(255,77,18,0.5)] transition-all duration-300 hover:bg-[#E63F05] hover:shadow-[0_0_45px_-3px_rgba(255,77,18,0.7)]"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-14 rounded-full border border-border bg-card px-8 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-neutral-500/10 hover:border-foreground/30"
            >
              <Link href="/tournaments">
                Explore Tournaments
              </Link>
            </Button>
          </motion.div>

          {/* Performance Pillars Grid at base of hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 sm:mt-24 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-border pt-8"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-[#FF4D12]">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <p className="font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground">Grassroots to Elite</p>
                <p className="mt-1 text-xs text-muted-foreground">Standardized lifecycle tournament management</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-[#F28C28]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground">Verified Profiles</p>
                <p className="mt-1 text-xs text-muted-foreground">Cryptographically verifiable digital certificates</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-[#FF4D12]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground">Sponsor Marketplace</p>
                <p className="mt-1 text-xs text-muted-foreground">Direct talent scouting & brand endorsements</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
