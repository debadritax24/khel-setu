import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SPORT_CATEGORIES } from "@/constants";
import { prisma } from "@/lib/prisma";
import { SportCategory, TournamentStatus } from "@prisma/client";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users, Award } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SportsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function SportsPage({ searchParams }: SportsPageProps) {
  const { category: rawCategory } = await searchParams;
  const selectedCategory = rawCategory
    ? (rawCategory.toUpperCase() as SportCategory)
    : undefined;

  const validCategory = selectedCategory && Object.values(SportCategory).includes(selectedCategory)
    ? selectedCategory
    : undefined;

  // 1. Fetch tournament counts per category
  const tournamentCounts = await prisma.tournament.groupBy({
    by: ["sportCategory"],
    _count: { id: true },
  }).catch(() => []);

  const countsMap = new Map<string, number>();
  tournamentCounts.forEach((tc) => {
    countsMap.set(tc.sportCategory, tc._count.id);
  });

  // 2. Fetch tournaments for the selected sport (or all tournaments if none selected)
  const tournaments = await prisma.tournament.findMany({
    where: validCategory ? { sportCategory: validCategory } : undefined,
    orderBy: { startDate: "asc" },
    take: validCategory ? 20 : 6,
  }).catch(() => []);

  const activeSportMeta = validCategory
    ? SPORT_CATEGORIES.find((s) => s.value === validCategory)
    : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 font-mono-tag text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/sports" className={cn("hover:text-primary transition-colors", !validCategory && "text-primary font-bold")}>
            SPORTS
          </Link>
          {validCategory && (
            <>
              <span>/</span>
              <span className="text-primary font-bold uppercase">{activeSportMeta?.label || validCategory}</span>
            </>
          )}
        </div>

        {validCategory ? (
          /* =========================================================================
             VIEW 1: SPECIFIC SPORT SELECTED (e.g. Cricket, Football, Badminton)
             ========================================================================= */
          <div className="space-y-10">
            {/* Sport Detail Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl border border-border bg-neutral-500/5 text-5xl sm:text-6xl shadow-inner">
                    {activeSportMeta?.icon || "🏅"}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-wider text-[#FF4D12] mb-1">
                      <span>NATIONAL DISCIPLINE DIRECTORY</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                      {activeSportMeta?.label || validCategory}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
                      Explore sanctioned tournaments, academy leagues, and grassroots championships for {activeSportMeta?.label || validCategory} across India.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full border-border bg-background hover:bg-neutral-500/10"
                  >
                    <Link href="/sports" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span>All Sports</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-[0_0_25px_-5px_rgba(255,77,18,0.5)]"
                  >
                    <Link href="/tournaments/create">
                      Create Tournament
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Sport Discipline Quick Filter Strip */}
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="font-mono-tag text-xs text-muted-foreground mr-2 shrink-0">DISCIPLINES:</span>
                {SPORT_CATEGORIES.map((sport) => {
                  const isCurrent = sport.value === validCategory;
                  const count = countsMap.get(sport.value) || 0;
                  return (
                    <Link
                      key={sport.value}
                      href={`/sports?category=${sport.value}`}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-tag uppercase tracking-wider whitespace-nowrap transition-all border shrink-0",
                        isCurrent
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-neutral-500/10"
                      )}
                    >
                      <span>{sport.icon}</span>
                      <span>{sport.label}</span>
                      {count > 0 && (
                        <span className={cn(
                          "ml-1 text-[10px] px-1.5 py-0.2 rounded-full",
                          isCurrent ? "bg-white/20 text-white" : "bg-neutral-500/15 text-muted-foreground"
                        )}>
                          {count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tournaments List for Selected Sport */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                    <span>Active Tournaments in {activeSportMeta?.label || validCategory}</span>
                    <Badge variant="secondary" className="font-mono-tag text-xs font-bold bg-primary/10 text-primary border-0">
                      {tournaments.length} {tournaments.length === 1 ? "Event" : "Events"}
                    </Badge>
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a tournament to inspect brackets, schedules, prize pools, and registration guidelines.
                  </p>
                </div>
              </div>

              {tournaments.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-neutral-500/5 text-2xl mb-4">
                    {activeSportMeta?.icon || "🏆"}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    No active tournaments for {activeSportMeta?.label || validCategory} right now
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Be the first organizer to host an official tournament for {activeSportMeta?.label || validCategory} on Khel Setu.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/sports">View Other Sports</Link>
                    </Button>
                    <Button asChild className="rounded-full bg-primary hover:bg-primary-hover text-white">
                      <Link href="/tournaments/create">Host Tournament</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tournaments.map((tournament) => (
                    <Card
                      key={tournament.id}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                    >
                      {/* Card Header */}
                      <div className="p-6 bg-gradient-to-b from-neutral-500/5 to-transparent border-b border-border/50">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono-tag text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                            {tournament.sportCategory}
                          </span>
                          <span
                            className={cn(
                              "font-mono-tag text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border",
                              tournament.status === TournamentStatus.ONGOING
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                : tournament.status === TournamentStatus.REGISTRATION_OPEN
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-neutral-500/10 text-muted-foreground border-border"
                            )}
                          >
                            {tournament.status.replace(/_/g, " ")}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          <Link href={`/tournaments/${tournament.id}`}>
                            {tournament.title}
                          </Link>
                        </h3>

                        {tournament.description && (
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {tournament.description}
                          </p>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2 font-mono-tag text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-2.5 h-4 w-4 text-primary shrink-0" />
                            <span>
                              {new Date(tournament.startDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                              {" - "}
                              {new Date(tournament.endDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <MapPin className="mr-2.5 h-4 w-4 text-primary shrink-0" />
                            <span className="truncate">{tournament.city}, {tournament.state}</span>
                          </div>

                          {tournament.prizePool && (
                            <div className="flex items-center text-primary font-bold">
                              <Award className="mr-2.5 h-4 w-4 shrink-0" />
                              <span>₹{tournament.prizePool.toLocaleString("en-IN")} Prize Pool</span>
                            </div>
                          )}

                          {tournament.maxParticipants && (
                            <div className="flex items-center">
                              <Users className="mr-2.5 h-4 w-4 text-muted-foreground shrink-0" />
                              <span>Max {tournament.maxParticipants} Teams / Athletes</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <Button
                            asChild
                            className="w-full rounded-xl bg-neutral-500/10 border border-border font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-[0_0_25px_-5px_rgba(255,77,18,0.5)]"
                          >
                            <Link href={`/tournaments/${tournament.id}`} className="flex items-center justify-center gap-2 py-5">
                              <span>Inspect Tournament</span>
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* =========================================================================
             VIEW 2: OVERVIEW OF ALL SPORTS CATEGORIES
             ========================================================================= */
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12] mb-3">
                <span>[ 01 // DISCIPLINE DIRECTORY ]</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                Sports Ecosystem
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
                Explore sanctioned Olympic, traditional, and grassroots disciplines across India. Select any sport below to inspect active tournaments and championships.
              </p>
            </div>

            {/* Grid of all sports */}
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {SPORT_CATEGORIES.map((sport) => {
                const count = countsMap.get(sport.value) || 0;
                return (
                  <Link
                    key={sport.value}
                    href={`/sports?category=${sport.value}`}
                    className="group"
                  >
                    <Card className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-2 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
                      <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
                        <div className="w-full flex items-center justify-between mb-4">
                          <span className="font-mono-tag text-[10px] text-muted-foreground uppercase">
                            DISCIPLINE
                          </span>
                          <span className={cn(
                            "font-mono-tag text-[10px] font-bold px-2 py-0.5 rounded-full border",
                            count > 0
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-neutral-500/10 text-muted-foreground border-border"
                          )}>
                            {count > 0 ? `${count} ${count === 1 ? "Event" : "Events"}` : "Opening Soon"}
                          </span>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-neutral-500/5 text-4xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30">
                          {sport.icon}
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {sport.label}
                        </h3>

                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          Inspect championships, tournaments & talent rankings.
                        </p>

                        <div className="mt-5 w-full pt-4 border-t border-border/50 flex items-center justify-center gap-1.5 font-mono-tag text-xs font-bold text-primary uppercase">
                          <span>Inspect Tournaments</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Featured Active Tournaments across all disciplines */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12]">
                    <span>[ LIVE TOURNAMENTS ]</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                    Featured Tournaments Across All Sports
                  </h2>
                </div>
                <Button asChild variant="outline" className="rounded-full border-border">
                  <Link href="/tournaments">View All Tournaments</Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tournaments.slice(0, 6).map((tournament) => (
                  <Card
                    key={tournament.id}
                    className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="p-6 bg-gradient-to-b from-neutral-500/5 to-transparent border-b border-border/50">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono-tag text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                          {tournament.sportCategory}
                        </span>
                        <span
                          className={cn(
                            "font-mono-tag text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border",
                            tournament.status === TournamentStatus.ONGOING
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-neutral-500/10 text-muted-foreground border-border"
                          )}
                        >
                          {tournament.status.replace(/_/g, " ")}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={`/tournaments/${tournament.id}`}>
                          {tournament.title}
                        </Link>
                      </h3>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2 font-mono-tag text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-2.5 h-4 w-4 text-primary shrink-0" />
                          <span>
                            {new Date(tournament.startDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2.5 h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{tournament.city}, {tournament.state}</span>
                        </div>
                        {tournament.prizePool && (
                          <div className="flex items-center text-primary font-bold">
                            <Award className="mr-2.5 h-4 w-4 shrink-0" />
                            <span>₹{tournament.prizePool.toLocaleString("en-IN")} Prize Pool</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <Button
                          asChild
                          className="w-full rounded-xl bg-neutral-500/10 border border-border font-mono-tag text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white"
                        >
                          <Link href={`/tournaments/${tournament.id}`} className="flex items-center justify-center gap-2 py-5">
                            <span>Inspect Tournament</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
