import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import Body, { meta as rawMeta } from "@/content/pages/about.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { primaryCta } from "@/lib/navigation";

const meta = defineMeta("content/pages/about.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/about");

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="About"
        title="One engineer, from scan to go-live"
        lead="VFP Migration Scanner is run by Kashif, a senior .NET engineer who specialises in moving Visual FoxPro applications to .NET and SQL Server."
      />
      <Prose>
        <Body />
      </Prose>
      <CtaBand
        title="Start with the facts about your application"
        body="Run the free scan, then talk to the engineer who would do the work."
        primary={primaryCta}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
