import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { PricingTable } from "@/components/sections/pricing-table";
import { Section } from "@/components/sections/section";
import { buttonVariants } from "@/components/ui/button";
import Body, { meta as rawMeta } from "@/content/pages/assessment.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { faqByGroup, toFaqItems } from "@/lib/faq";
import { tiers } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPage, service } from "@/lib/schema";

const meta = defineMeta("content/pages/assessment.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/assessment");

const assessment = tiers.filter((t) => t.id === "assessment");
const faq = faqByGroup("Migration Assessment");

export default function AssessmentPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          service({
            path: "/assessment",
            name: "Visual FoxPro Migration Assessment",
            serviceType: "Software migration assessment",
            description: meta.description,
            tier: assessment[0],
          }),
          faqPage(faq, "/assessment"),
        ]}
      />
      <PageHeader
        breadcrumbs={[{ name: "Assessment", path: "/assessment" }]}
        eyebrow="Migration Assessment"
        title="A fixed-price plan for your FoxPro migration"
        lead="In 5 to 10 working days, your scan becomes a written plan: what is hard and why, what the data migration involves, what you can leave behind, and what to do first."
        actions={
          <>
            {/* Checkout is wired in VW-032; until then the button opens the contact page. */}
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Book the assessment
            </Link>
            <Link href="/free-scan" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Run the free scan first
            </Link>
          </>
        }
      />

      <Prose>
        <Body />
      </Prose>

      <Section id="price" eyebrow="Price" title="One fixed price, set by size" tone="muted">
        <div className="max-w-md">
          <PricingTable tiers={assessment} />
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions about the assessment">
        <div className="max-w-3xl">
          <Faq items={toFaqItems(faq)} />
        </div>
      </Section>

      <CtaBand
        title="Know the risks before you commit"
        body="Start with the free scan, or book the assessment directly."
        primary={{ label: "Book the assessment", href: "/contact" }}
        secondary={{ label: "Get free scan", href: "/free-scan" }}
      />
    </main>
  );
}
