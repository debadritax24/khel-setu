"use client";

import { motion } from "framer-motion";
import {
  Trophy, Users, BarChart3, Award, MessageSquare, Shield,
  MapPin, Calendar, TrendingUp, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Trophy,
    title: "Tournament Management",
    description: "Discover, register, and participate in tournaments across India with real-time updates and live scoring.",
    code: "01",
    span: "lg:col-span-2",
    tag: "LIVE SCORING & BRACKETS",
  },
  {
    icon: Users,
    title: "Connect & Network",
    description: "Build your sports network with athletes, coaches, schools, and sponsors.",
    code: "02",
    span: "lg:col-span-1",
    tag: "ATHLETE DIRECTORY",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress with detailed analytics and performance metrics.",
    code: "03",
    span: "lg:col-span-1",
    tag: "METRICS ENGINE",
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Earn verified digital certificates for your achievements.",
    code: "04",
    span: "lg:col-span-1",
    tag: "SECURE QR VERIFICATION",
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description: "Direct communication with coaches, sponsors, and fellow athletes.",
    code: "05",
    span: "lg:col-span-1",
    tag: "ENCRYPTED CHAT",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Trusted and verified profiles for athletes, schools, and coaches across the platform.",
    code: "06",
    span: "lg:col-span-2",
    tag: "MULTI-ROLE VERIFICATION",
  },
  {
    icon: MapPin,
    title: "Location Discovery",
    description: "Find nearby tournaments, schools, and athletes.",
    code: "07",
    span: "lg:col-span-1",
    tag: "GEOLOCATION MAPPING",
  },
  {
    icon: Calendar,
    title: "Event Calendar",
    description: "Never miss an event with our comprehensive sports calendar.",
    code: "08",
    span: "lg:col-span-2",
    tag: "SYNCHRONIZED SCHEDULES",
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "AI-powered guidance to help you reach your full potential.",
    code: "09",
    span: "lg:col-span-1",
    tag: "DEVELOPMENT PATHWAY",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-background py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-16 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12]">
              <span>[ 02 // PLATFORM CAPABILITIES ]</span>
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Built for the game
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Everything athletes, coaches, schools, and sponsors need — in one platform.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-7 backdrop-blur-sm transition-all duration-300 shadow-xs",
                  "hover:border-[#FF4D12]/45 hover:shadow-[0_12px_32px_-10px_rgba(255,77,18,0.15)]",
                  feature.span
                )}
              >
                {/* Top card header: Code and Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tag text-xs font-bold text-[#FF4D12]">
                      {"//"}{feature.code}
                    </span>
                    <span className="font-mono-tag text-[10px] tracking-wider text-muted-foreground uppercase">
                      {feature.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:text-[#FF4D12] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Card Icon & Content */}
                <div className="mt-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-neutral-500/5 text-[#FF4D12] transition-all duration-300 group-hover:bg-[#FF4D12]/15 group-hover:border-[#FF4D12]/30 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-mono-tag text-[10px] text-muted-foreground uppercase">STATUS: ACTIVE</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-[#FF4D12] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
