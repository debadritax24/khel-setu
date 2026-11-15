"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { SPORT_CATEGORIES } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-between">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1 w-full">
        <PageHeader
          title="Sports"
          description="Explore all sports available on Khel Setu."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SPORT_CATEGORIES.map((sport) => (
            <Link key={sport.value} href={`/sports?category=${sport.value}`} className="group">
              <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/90 backdrop-blur-sm p-2 transition-all duration-300 hover:border-[#FF4D12]/40 hover:bg-[#161616] hover:shadow-[0_10px_30px_-10px_rgba(255,77,18,0.2)]">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF4D12]/10 group-hover:border-[#FF4D12]/30">
                    {sport.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                    {sport.label}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400">
                    Explore tournaments and athletes
                  </p>
                  <div className="mt-4 flex items-center gap-1 font-mono-tag text-[11px] font-semibold text-[#FF4D12] uppercase opacity-80 group-hover:opacity-100">
                    <span>View Category</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}