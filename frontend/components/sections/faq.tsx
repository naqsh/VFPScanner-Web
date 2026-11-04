import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export type FaqItem = { question: string; answer: ReactNode };

/**
 * FAQ with native <details>: works without JavaScript and the answers are in the
 * HTML for crawlers and AI answers (GEO). FAQPage JSON-LD is added in VW-024.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y rounded-xl border bg-card">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md font-medium">
            <h3 className="text-base">{item.question}</h3>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 text-sm text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
