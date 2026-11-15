import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <div className="relative hidden flex-1 items-center justify-center bg-[#0E0E0E] lg:flex border-r border-white/10 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4D12]/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-md text-center p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#FF4D12] mb-6 shadow-[0_0_30px_-5px_rgba(255,77,18,0.4)]">
            <Trophy className="h-8 w-8" />
          </div>
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#FF4D12]">
            [ IDENTITY ACCESS ]
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-white">
            KHEL <span className="text-[#FF4D12]">सेतु</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            One Platform. Every Athlete. Every Opportunity.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <SignIn />
          <p className="mt-6 text-center text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#FF4D12] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
