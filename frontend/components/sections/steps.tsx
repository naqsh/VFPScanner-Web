import type { ReactNode } from "react";

export type Step = { title: string; body: ReactNode };

/** Ordered steps ("how it works"). Real <ol> so the order is announced. */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-xl border bg-card p-6">
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-full border border-primary/40 font-mono text-sm text-primary"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
