import { getVerifiedSponsors } from "@/actions/sponsor.actions";
import { SponsorsClient } from "./sponsors-client";
import { Sponsor } from "@prisma/client";

export async function SponsorsSection() {
  let sponsors: Sponsor[] = [];
  try {
    sponsors = await getVerifiedSponsors(6);
  } catch {
    // Ignore error
  }

  if (sponsors.length === 0) {
    return null; // Don't show the section if there are no sponsors yet
  }

  return (
    <section className="relative bg-card py-24 sm:py-32 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12] mb-3">
            <span>[ 05 // STRATEGIC ALLIANCES ]</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
            Trusted by Leading Brands
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Partnering with top organizations to support India&apos;s athletes.
          </p>
        </div>

        <SponsorsClient sponsors={sponsors} />
      </div>
    </section>
  );
}
