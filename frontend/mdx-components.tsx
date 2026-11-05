import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes, TableHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Prose styling for all MDX content (required by @next/mdx in the App Router). */
function A({ href = "", className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn("font-medium text-primary underline underline-offset-3 hover:no-underline", className);
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={cls} {...props} />;
  return <a href={href} className={cls} rel="noopener" {...props} />;
}

function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    // Focusable so keyboard users can scroll wide tables (axe: scrollable-region-focusable)
    <div role="region" aria-label="Table" tabIndex={0} className="my-6 overflow-x-auto rounded-xl border">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}

const components: MDXComponents = {
  h2: (p: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-4 scroll-mt-20 text-2xl font-semibold tracking-tight text-balance first:mt-0" {...p} />
  ),
  h3: (p: HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-8 mb-3 scroll-mt-20 text-lg font-semibold" {...p} />,
  p: (p: HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 leading-7 text-pretty" {...p} />,
  ul: (p: HTMLAttributes<HTMLUListElement>) => <ul className="my-4 list-disc space-y-2 pl-6 marker:text-primary" {...p} />,
  ol: (p: HTMLAttributes<HTMLOListElement>) => <ol className="my-4 list-decimal space-y-2 pl-6 marker:text-primary" {...p} />,
  li: (p: HTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...p} />,
  a: A,
  strong: (p: HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...p} />,
  code: (p: HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />
  ),
  pre: (p: HTMLAttributes<HTMLPreElement>) => (
    <pre
      tabIndex={0}
      className="my-6 overflow-x-auto rounded-xl bg-stage p-4 font-mono text-sm text-stage-foreground ring-1 ring-white/10 [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  blockquote: (p: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-primary pl-4 text-muted-foreground" {...p} />
  ),
  hr: () => <hr className="my-10" />,
  table: Table,
  th: (p: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border-b bg-muted/50 px-4 py-2 font-semibold" {...p} />
  ),
  td: (p: HTMLAttributes<HTMLTableCellElement>) => <td className="border-b px-4 py-2 align-top" {...p} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
