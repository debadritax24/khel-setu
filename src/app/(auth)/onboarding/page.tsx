import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OnboardingForm } from "./_components/onboarding-form";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-up");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-4 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF4D12]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl space-y-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12] mb-3">
            <span>[ INITIALIZATION PROTOCOL ]</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Welcome to KHEL <span className="text-[#FF4D12]">सेतु</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-xl mx-auto">
            How are you planning to use the platform? Select your primary role below.
          </p>
        </div>
        
        <OnboardingForm />
      </div>
    </div>
  );
}
