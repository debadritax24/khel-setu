import { getAllTournaments } from "@/actions/tournament.actions";
import { EventsClient } from "./events-client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";

export async function EventsSection() {
  const result = await getAllTournaments(1, 3).catch(() => null);
  const events = result?.data ?? [];

  return (
    <section className="relative bg-background py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-12 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12]">
              <span>[ 04 // COMPETITION ARENA ]</span>
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
              Upcoming Events
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              Don&apos;t miss out on exciting tournaments across India.
            </p>
          </div>

          <Button
            variant="outline"
            className="group rounded-full border border-border bg-card text-foreground hover:bg-[#FF4D12]/10 hover:border-[#FF4D12]/50 hover:text-primary transition-all px-6 py-5 text-sm font-semibold"
            asChild
          >
            <Link href="/tournaments" className="flex items-center gap-2">
              <span>View All Events</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {events.length > 0 ? (
          <EventsClient events={events} />
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center backdrop-blur-sm">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="font-display text-lg font-bold text-foreground">No upcoming tournaments available yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon or explore previous tournament archives.</p>
          </div>
        )}
      </div>
    </section>
  );
}
