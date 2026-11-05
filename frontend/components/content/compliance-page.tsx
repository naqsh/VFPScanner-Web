import Link from "next/link";
import type { MDXContent } from "mdx/types";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { type Fact, FactBlock } from "@/components/sections/fact-block";
import { Faq } from "@/components/sections/faq";
import { Section } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import type { PageMeta } from "@/lib/content";
import { primaryCta } from "@/lib/navigation";
import { article, faqPage } from "@/lib/schema";

/**
 * Compliance page layout (VW-026/027): answer first, dated facts with sources,
 * explanation, page FAQ, CTA. Article + FAQPage JSON-LD describe only what is shown.
 */
export function CompliancePage({
  path,
  meta,
  Body,
  eyebrow,
  answer,
  facts,
  about,
}: {
  path: string;
  meta: PageMeta;
  Body: MDXContent;
  eyebrow: string;
  answer: ReactNode;
  facts: Fact[];
  about: string[];
}) {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          article({
            path,
            headline: meta.title,
            description: meta.description,
            datePublished: meta.published ?? meta.updated,
            dateModified: meta.updated,
            about,
          }),
          ...(meta.faq.length ? [faqPage(meta.faq, path)] : []),
        ]}
      />
      <PageHeader
        breadcrumbs={[{ name: meta.title, path }]}
        eyebrow={eyebrow}
        title={meta.title}
        lead={answer}
        updated={meta.updated}
        actions={
          <>
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {primaryCta.label}
            </Link>
            <Link href="#your-options" className={buttonVariants({ size: "lg", variant: "outline" })}>
              See your options
            </Link>
          </>
        }
      />

      <Section id="dates" eyebrow="Key dates" title="The dates and rules" tone="muted">
        <div className="grid gap-4 md:grid-cols-2">
          {facts.map((f) => (
            <FactBlock key={`${f.effective}-${f.lastReviewed}`} fact={f} />
          ))}
        </div>
      </Section>

      <Prose>
        <Body />
      </Prose>

      {meta.faq.length ? (
        <Section id="faq" eyebrow="FAQ" title="Questions" tone="muted">
          <div className="max-w-3xl">
            <Faq items={meta.faq.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Find where this touches your FoxPro application"
        body="The free scan shows where the affected data and code live. It runs on your PC."
        primary={primaryCta}
        secondary={{ label: "About the assessment", href: "/assessment" }}
      />
    </main>
  );
}
