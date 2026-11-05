import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { PricingTable } from "@/components/sections/pricing-table";
import { Section } from "@/components/sections/section";
import Body, { meta as rawMeta } from "@/content/pages/pricing.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { faqByGroup, toFaqItems } from "@/lib/faq";
import { primaryCta } from "@/lib/navigation";
import { tiers } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPage, offerCatalog } from "@/lib/schema";

const meta = defineMeta("content/pages/pricing.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/pricing");

const faq = faqByGroup("Pricing and working together");

export default function PricingPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={[offerCatalog(tiers, "/pricing"), faqPage(faq, "/pricing")]} />
      <PageHeader
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title="Start free. Pay a fixed price for the plan."
        lead="The scan is free. The assessment has a fixed price set by application size. Migrations are quoted after it."
      />

      <section aria-label="Plans" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6">
        <PricingTable tiers={tiers} />
      </section>

      <Prose>
        <Body />
      </Prose>

      <Section id="faq" eyebrow="FAQ" title="Questions about pricing" tone="muted">
        <div className="max-w-3xl">
          <Faq items={toFaqItems(faq)} />
        </div>
      </Section>

      <CtaBand
        title="Not sure which you need?"
        body="Run the free scan. The size it measures tells you which assessment applies."
        primary={primaryCta}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
