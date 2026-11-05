import type { MDXContent } from "mdx/types";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { TemplateBanner } from "@/components/content/template-banner";
import type { PageMeta } from "@/lib/content";

/** Shared layout for /legal/* pages. Templates show a review banner and are noindex (lib/content.ts). */
export function LegalPage({ Body, meta, path }: { Body: MDXContent; meta: PageMeta; path: string }) {
  return (
    <main id="main" className="flex-1">
      <PageHeader breadcrumbs={[{ name: meta.title, path }]} eyebrow="Legal" title={meta.title} updated={meta.updated} />
      {meta.template ? <TemplateBanner /> : null}
      <Prose>
        <Body />
      </Prose>
    </main>
  );
}
