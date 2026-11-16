"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative bg-background py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-gradient-to-b from-card via-card to-background/50 p-10 text-center sm:p-20 lg:p-24 overflow-hidden shadow-xl"
        >
          {/* Internal ambient flare */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF4D12]/15 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12] mb-6">
              <span>[ 07 // NEXT STEPS ]</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-tight">
              Ready to start your journey?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed font-normal">
              Create your verified profile and take part in a connected sports ecosystem built for India.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="group relative h-14 rounded-full bg-[#FF4D12] px-10 text-base font-bold text-white shadow-[0_0_35px_-5px_rgba(255,77,18,0.5)] transition-all duration-300 hover:bg-[#E63F05] hover:shadow-[0_0_45px_-3px_rgba(255,77,18,0.7)]"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  <span>Get Started Free</span>
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
