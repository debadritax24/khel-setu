"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { getAllTournaments } from "@/actions/tournament.actions";
import { cn } from "@/lib/utils";

interface EventsClientProps {
  events: Awaited<ReturnType<typeof getAllTournaments>>["data"];
}

export function EventsClient({ events }: EventsClientProps) {
  if (events.length === 0) return null;

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#FF4D12]/50 hover:shadow-[0_12px_35px_-10px_rgba(255,77,18,0.2)] shadow-xs"
        >
          {/* Top header with sport badge & status */}
          <div className="relative p-6 bg-gradient-to-b from-neutral-500/5 to-transparent border-b border-border/50">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-tag text-xs font-bold uppercase tracking-wider text-[#FF4D12] bg-[#FF4D12]/10 border border-[#FF4D12]/20 px-3 py-1 rounded-full">
                {event.sportCategory}
              </span>
              <span
                className={cn(
                  "font-mono-tag text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border",
                  event.status === "ONGOING"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-neutral-500/10 text-muted-foreground border-border"
                )}
              >
                {event.status.replace(/_/g, " ")}
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>

          {/* Details body */}
          <div className="p-6 space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center text-xs font-mono-tag text-muted-foreground">
                <Calendar className="mr-3 h-4 w-4 text-[#FF4D12] shrink-0" />
                <span>
                  {new Date(event.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center text-xs font-mono-tag text-muted-foreground">
                <MapPin className="mr-3 h-4 w-4 text-[#FF4D12] shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button
                asChild
                className="w-full rounded-xl bg-neutral-500/10 border border-border font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:bg-[#FF4D12] group-hover:border-[#FF4D12] group-hover:text-white group-hover:shadow-[0_0_25px_-5px_rgba(255,77,18,0.5)]"
              >
                <Link href={`/tournaments/${event.id}`} className="flex items-center justify-center gap-2 py-5">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
