"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/actions/user.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Award, GraduationCap, Handshake, Loader2, Users } from "lucide-react";

type RoleOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const ROLES: RoleOption[] = [
  {
    id: "ATHLETE",
    title: "Athlete",
    description: "Build your portfolio, showcase achievements, and find tournaments.",
    icon: Award,
  },
  {
    id: "COACH",
    title: "Coach",
    description: "Manage athletes, track performance, and discover new talent.",
    icon: Users,
  },
  {
    id: "SCHOOL_ADMIN",
    title: "School Admin",
    description: "Manage school athletes, teams, and tournament participations.",
    icon: GraduationCap,
  },
  {
    id: "SPONSOR",
    title: "Sponsor",
    description: "Discover rising talents and tournaments to sponsor.",
    icon: Handshake,
  },
];

export function OnboardingForm() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    try {
      await completeOnboarding(selectedRole);
      router.push("/profile");
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card
              key={role.id}
              className={cn(
                "group cursor-pointer rounded-2xl border p-2 transition-all duration-300",
                isSelected
                  ? "border-[#FF4D12] bg-[#FF4D12]/10 shadow-[0_0_30px_-5px_rgba(255,77,18,0.3)] ring-1 ring-[#FF4D12]"
                  : "border-white/10 bg-[#141414]/90 hover:border-white/30 hover:bg-[#1A1A1A]"
              )}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className={cn(
                  "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300",
                  isSelected
                    ? "border-[#FF4D12] bg-[#FF4D12] text-white shadow-[0_0_20px_-3px_rgba(255,77,18,0.6)]"
                    : "border-white/10 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-white/20"
                )}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-white">{role.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{role.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          disabled={!selectedRole || isSubmitting}
          onClick={handleSubmit}
          className="w-full max-w-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up your workspace...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  );
}
