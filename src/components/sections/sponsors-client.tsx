"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sponsor } from "@prisma/client";

interface SponsorsClientProps {
  sponsors: Sponsor[];
}

export function SponsorsClient({ sponsors }: SponsorsClientProps) {
  if (sponsors.length === 0) return null;

  return (
    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {sponsors.map((sponsor, index) => (
        <motion.div
          key={sponsor.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-[#141414]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#FF4D12]/40 hover:bg-[#1A1A1A] cursor-pointer"
        >
          <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF4D12]/30 overflow-hidden">
            {sponsor.logo ? (
              <Image src={sponsor.logo} alt={sponsor.companyName} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            ) : (
              <span className="font-display text-2xl font-black text-white/50 group-hover:text-[#FF4D12] transition-colors">
                {sponsor.companyName.charAt(0)}
              </span>
            )}
          </div>
          <p className="mt-4 font-display text-sm font-bold text-white text-center line-clamp-1 group-hover:text-white">
            {sponsor.companyName}
          </p>
          <p className="mt-1 font-mono-tag text-[10px] text-neutral-400 text-center uppercase tracking-wider line-clamp-1">
            {sponsor.industry || "Official Partner"}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
