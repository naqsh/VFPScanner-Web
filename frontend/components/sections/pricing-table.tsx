import { Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingTable({ tiers }: { tiers: Tier[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {tiers.map((tier) => (
        <li
          key={tier.id}
          className={cn(
            "flex flex-col rounded-xl border bg-card p-6",
            tier.highlight && "border-primary/60 ring-1 ring-primary/40",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold">{tier.name}</h3>
            {tier.highlight ? <Badge variant="accent">Most chosen first step</Badge> : null}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tier.summary}</p>
          <p className="mt-5 text-3xl font-semibold tracking-tight">{formatPrice(tier.price)}</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={tier.cta.href}
            className={cn(buttonVariants({ variant: tier.highlight ? "default" : "outline" }), "mt-6 w-full")}
          >
            {tier.cta.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
