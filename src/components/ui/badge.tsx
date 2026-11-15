import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-mono-tag font-bold tracking-wider uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4D12]",
  {
    variants: {
      variant: {
        default: "border-[#FF4D12]/30 bg-[#FF4D12]/15 text-[#FF4D12]",
        secondary: "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10",
        destructive: "border-red-500/30 bg-red-500/10 text-red-400",
        outline: "border-white/20 text-neutral-200",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
