import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Section } from "@/components/sections/section";
import { buttonVariants } from "@/components/ui/button";
import { homeFeatures } from "@/content/data/home";
import Body, { meta as rawMeta } from "@/content/pages/free-scan.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { cn } from "@/lib/utils";

const meta = defineMeta("content/pages/free-scan.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/free-scan");

const needs = [
  { title: "Windows, Linux or macOS", body: "Any PC that can read the application folder, including a network share." },
  { title: "Nothing to install on Windows", body: "The Windows download will be a single self-contained file. Building from source needs the .NET SDK." },
  { title: "Read access only", body: "The scanner reads the folder and writes only its two report files to a folder you choose." },
];

export default function FreeScanPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Free scan"
        title="See what your FoxPro application contains"
        lead="Run the read-only scanner on your PC and see size, risk, data and compliance signals. Your code never leaves your machine."
        actions={
          <>
            {/* Download is gated by the free-scan form in VW-031. */}
            <span
              aria-disabled="true"
              className={cn(buttonVariants({ size: "lg" }), "pointer-events-none opacity-60")}
            >
              Download opens at launch
            </span>
            <Link href="/scanner" className={buttonVariants({ size: "lg", variant: "outline" })}>
              What the scanner reads
            </Link>
          </>
        }
      />

      <Section id="what-you-get" eyebrow="What you get" title="Your report shows" tone="muted">
        <FeatureGrid items={homeFeatures} columns={2} />
      </Section>

      <Section id="needs" eyebrow="What you need" title="Requirements">
        <FeatureGrid items={needs} />
      </Section>

      <Prose className="pt-0">
        <Body />
      </Prose>

      <CtaBand
        title="Want a second pair of eyes on the report?"
        body="The Migration Assessment turns it into a phased plan with effort ranges."
        primary={{ label: "About the assessment", href: "/assessment" }}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
