"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Trophy, Award, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and create your athlete, coach, school, or sponsor profile.",
    step: "01",
    phase: "PHASE ONE // ONBOARDING",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse tournaments, connect with coaches, and find sponsorships.",
    step: "02",
    phase: "PHASE TWO // SCOUTING",
  },
  {
    icon: Trophy,
    title: "Compete & Grow",
    description: "Participate in tournaments and track your performance.",
    step: "03",
    phase: "PHASE THREE // PERFORMANCE",
  },
  {
    icon: Award,
    title: "Get Discovered",
    description: "Win certificates, build your reputation, and attract sponsors.",
    step: "04",
    phase: "PHASE FOUR // RECOGNITION",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative bg-card py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-16 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12]">
              <span>[ 03 // THE ATHLETIC PATHWAY ]</span>
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              How it works
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Get started in four simple steps.
          </p>
        </div>

        {/* 4 Steps Architecture */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Subtle horizontal track line on desktop */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-[1px] bg-border pointer-events-none -z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-background/90 p-7 backdrop-blur-sm transition-all duration-300 hover:border-[#FF4D12]/50 hover:shadow-[0_12px_35px_-10px_rgba(255,77,18,0.2)]"
              >
                <div>
                  {/* Top Bar: Icon and Step Numeral */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-neutral-500/5 text-[#FF4D12] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#FF4D12]/15 group-hover:border-[#FF4D12]/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-4xl sm:text-5xl font-black text-foreground/15 transition-colors duration-300 group-hover:text-[#FF4D12]/30">
                      {step.step}
                    </span>
                  </div>

                  <p className="font-mono-tag text-[10px] tracking-wider text-[#FF4D12] uppercase mb-2 font-bold">
                    {step.phase}
                  </p>

                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono-tag text-muted-foreground">
                  <span>STEP {step.step} / 04</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-[#FF4D12] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
