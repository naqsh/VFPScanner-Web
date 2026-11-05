import type { ReactNode } from "react";

export function Hero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  note,
}: {
  eyebrow?: string;
  title: string;
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-20 lg:pb-24">
        <div>
          {eyebrow ? (
            <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
          ) : null}
          <h1 id="hero-title" className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <div className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">{lead}</div>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          {note ? <p className="mt-4 text-sm text-muted-foreground">{note}</p> : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}
