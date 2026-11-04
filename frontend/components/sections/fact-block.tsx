import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

/**
 * Dated fact with an official source (GEO rule: answer-first, sourced, reviewed).
 * Facts not yet checked against the source render a visible "To verify" badge,
 * so an unverified claim can never look final (see docs/SEO-GEO-PLAYBOOK.md §5).
 */
export type Fact = {
  effective: string; // e.g. "1 January 2027"
  statement: ReactNode;
  source: { label: string; href: string };
  lastReviewed: string; // ISO date
  verified: boolean;
};

export function FactBlock({ fact }: { fact: Fact }) {
  return (
    <aside className="rounded-xl border-l-4 border-primary bg-card p-5 shadow-xs ring-1 ring-border">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{fact.effective}</p>
        {fact.verified ? null : <Badge variant="medium">To verify</Badge>}
      </div>
      <div className="mt-2 text-base">{fact.statement}</div>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <a
          href={fact.source.href}
          className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground"
          rel="noopener"
        >
          Source: {fact.source.label}
          <ExternalLink aria-hidden="true" className="size-3" />
        </a>
        <span>
          Last reviewed <time dateTime={fact.lastReviewed}>{fact.lastReviewed}</time>
        </span>
      </p>
    </aside>
  );
}
