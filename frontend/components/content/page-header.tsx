import type { ReactNode } from "react";

/** Top of an inner page: eyebrow, the page's only <h1>, lead and optional actions. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  updated,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  updated?: string;
}) {
  return (
    <header className="border-b bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-12 sm:px-6 lg:pt-16">
        {eyebrow ? <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {lead ? <div className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">{lead}</div> : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        {updated ? (
          <p className="mt-6 text-xs text-muted-foreground">
            Last reviewed <time dateTime={updated}>{updated}</time>
          </p>
        ) : null}
      </div>
    </header>
  );
}
