import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: ReactNode;
  primary: NavItem;
  secondary?: NavItem;
}) {
  return (
    <section aria-labelledby="cta-title" className="px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-6xl rounded-2xl bg-stage px-6 py-12 text-stage-foreground ring-1 ring-white/10 sm:px-12">
        <h2 id="cta-title" className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          {title}
        </h2>
        <div className="mt-4 max-w-2xl text-stage-muted">{body}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={primary.href}
            className={cn(buttonVariants({ size: "lg" }), "bg-stage-accent text-stage hover:bg-stage-accent/85")}
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/20 bg-transparent text-stage-foreground hover:bg-white/10 hover:text-stage-foreground",
              )}
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
