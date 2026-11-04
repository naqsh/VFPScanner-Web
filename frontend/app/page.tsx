import Link from "next/link";

import { ScanPanel } from "@/components/brand/scan-panel";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { ProofStats } from "@/components/sections/proof-stats";
import { Section } from "@/components/sections/section";
import { Steps } from "@/components/sections/steps";
import { buttonVariants } from "@/components/ui/button";
import { homeFeatures, homeStats, homeSteps } from "@/lib/home-content";
import { primaryCta } from "@/lib/navigation";
import { site } from "@/lib/site";

// Placeholder home built from the VW-011 sections. Final copy and order: VW-013.
export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero
        eyebrow="Visual FoxPro → .NET"
        title={site.tagline}
        lead="A read-only scanner that maps your FoxPro code, data and migration risk, then a fixed-price assessment that turns the scan into a migration plan for .NET and SQL Server."
        actions={
          <>
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {primaryCta.label}
            </Link>
            <Link href="#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
              How it works
            </Link>
          </>
        }
        note="Full site launching soon."
        aside={<ScanPanel />}
      />

      <Section id="what-it-does" eyebrow="The scanner" title="What the scan shows you">
        <FeatureGrid items={homeFeatures} />
      </Section>

      <Section id="how-it-works" eyebrow="How it works" title="From folder to migration plan in three steps" tone="muted">
        <Steps steps={homeSteps} />
      </Section>

      <Section id="proof" eyebrow="Tested on real code" title="What we measured">
        <ProofStats stats={homeStats} />
      </Section>

      <CtaBand
        title="Find out what your FoxPro application needs"
        body="Start with the free scan. It runs on your PC, and you decide what to share."
        primary={primaryCta}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </main>
  );
}
