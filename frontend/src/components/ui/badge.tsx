import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-primary/80",
        or:
          "border-transparent bg-or text-white hover:bg-or/80 w-fit",
        blue:
          "border-transparent bg-blue text-white hover:bg-blue/80 w-fit",
        black:
          "border-transparent bg-black text-white hover:bg-black/80 w-fit",
        test: "border border-black w-fit",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        filtre: "",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
