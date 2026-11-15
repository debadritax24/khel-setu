import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D12] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF4D12] text-white hover:bg-[#E63F05] shadow-[0_0_25px_-5px_rgba(255,77,18,0.4)] hover:shadow-[0_0_35px_-2px_rgba(255,77,18,0.6)] border border-transparent",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm",
        secondary:
          "bg-[#1A1A1A] text-white border border-white/10 hover:bg-[#222222] hover:border-white/20",
        ghost:
          "text-neutral-300 hover:text-white hover:bg-white/10",
        link: "text-[#FF4D12] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-lg px-3.5 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-7 text-base has-[>svg]:px-5 font-bold",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
