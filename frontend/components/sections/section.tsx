import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Page section wrapper: consistent width, spacing and an accessible heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "default",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-20 py-16 sm:py-20", tone === "muted" && "bg-muted/50", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
          ) : null}
          <h2 id={headingId} className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {intro ? <div className="mt-4 text-lg text-pretty text-muted-foreground">{intro}</div> : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
