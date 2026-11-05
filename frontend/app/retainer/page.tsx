import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { PricingTable } from "@/components/sections/pricing-table";
import { Section } from "@/components/sections/section";
import Body, { meta as rawMeta } from "@/content/pages/retainer.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { tiers } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { service } from "@/lib/schema";

const meta = defineMeta("content/pages/retainer.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/retainer");

const retainer = tiers.filter((t) => t.id === "retainer");

export default function RetainerPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={service({
          path: "/retainer",
          name: "Post-migration support retainer",
          serviceType: "Software maintenance and support",
          description: meta.description,
          tier: retainer[0],
        })}
      />
      <PageHeader
        breadcrumbs={[{ name: "Retainer", path: "/retainer" }]}
        eyebrow="Retainer"
        title="Support from the engineer who built it"
        lead="After go-live, a monthly retainer keeps your migrated application fixed, patched and compliant."
      />

      <Prose>
        <Body />
      </Prose>

      <Section id="price" eyebrow="Price" title="Monthly, cancel any month" tone="muted">
        <div className="max-w-md">
          <PricingTable tiers={retainer} />
        </div>
      </Section>

      <CtaBand
        title="Ask about a retainer"
        body="Tell us about your application and the support you need."
        primary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
