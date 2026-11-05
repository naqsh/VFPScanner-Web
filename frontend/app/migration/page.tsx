import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Section } from "@/components/sections/section";
import { buttonVariants } from "@/components/ui/button";
import Body, { meta as rawMeta } from "@/content/pages/migration.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { faqByGroup, toFaqItems } from "@/lib/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPage, service } from "@/lib/schema";

const meta = defineMeta("content/pages/migration.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/migration");

const faq = [
  ...faqByGroup("Migration"),
  ...faqByGroup("Compliance deadlines").filter((f) => f.question.startsWith("Is there a quick fix")),
];

export default function MigrationPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          service({
            path: "/migration",
            name: "Visual FoxPro to .NET and SQL Server migration",
            serviceType: "Legacy application migration",
            description: meta.description,
          }),
          faqPage(faq, "/migration"),
        ]}
      />
      <PageHeader
        breadcrumbs={[{ name: "Migration", path: "/migration" }]}
        eyebrow="Migration"
        title="From Visual FoxPro to .NET and SQL Server, one module at a time"
        lead="Data first, then modules. Old and new run side by side, and nothing switches over until the results match."
        actions={
          <>
            <Link href="/assessment" className={buttonVariants({ size: "lg" })}>
              Start with an assessment
            </Link>
            <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Talk to us
            </Link>
          </>
        }
      />

      <Prose>
        <Body />
      </Prose>

      <Section id="faq" eyebrow="FAQ" title="Questions about migration" tone="muted">
        <div className="max-w-3xl">
          <Faq items={toFaqItems(faq)} />
        </div>
      </Section>

      <CtaBand
        title="Every migration starts with the facts"
        body="The assessment measures size and risk, so the plan and the quote are based on your code."
        primary={{ label: "Book the assessment", href: "/assessment" }}
        secondary={{ label: "Get free scan", href: "/free-scan" }}
      />
    </main>
  );
}
