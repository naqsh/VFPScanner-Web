import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-foreground",
        accent: "border-primary/30 bg-accent text-accent-foreground",
        high: "border-risk-high/40 bg-risk-high/10 text-risk-high",
        medium: "border-risk-medium/40 bg-risk-medium/10 text-risk-medium",
        low: "border-risk-low/40 bg-risk-low/10 text-risk-low",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
