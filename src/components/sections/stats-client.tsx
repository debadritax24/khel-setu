"use client";

import { motion } from "framer-motion";

interface StatsClientProps {
  stats: {
    label: string;
    value: string;
  }[];
}

export function StatsClient({ stats }: StatsClientProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border gap-y-8 sm:gap-y-0">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group flex flex-col justify-between px-4 sm:px-8 py-2 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-tag text-[11px] tracking-widest text-[#FF4D12] uppercase font-semibold">
              {"// 0"}{index + 1}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-[#FF4D12] transition-colors" />
          </div>

          <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {stat.value}
          </p>

          <p className="mt-3 font-mono-tag text-xs font-semibold tracking-wider text-muted-foreground uppercase group-hover:text-foreground transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
