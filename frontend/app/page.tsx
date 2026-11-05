import type { Metadata } from "next";
import Link from "next/link";

import { ScanPanel } from "@/components/brand/scan-panel";
import { CtaBand } from "@/components/sections/cta-band";
import { FactBlock } from "@/components/sections/fact-block";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { PricingTable } from "@/components/sections/pricing-table";
import { ProofStats } from "@/components/sections/proof-stats";
import { Section } from "@/components/sections/section";
import { Steps } from "@/components/sections/steps";
import { buttonVariants } from "@/components/ui/button";
import { facts } from "@/content/data/facts";
import { homeFeatures, homeStats, homeSteps } from "@/content/data/home";
import { meta as rawMeta } from "@/content/pages/home.mdx";
import { defineMeta } from "@/lib/content";
import { featuredFaq, toFaqItems } from "@/lib/faq";
import { primaryCta } from "@/lib/navigation";
import { tiers } from "@/lib/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { scannerFeatures } from "@/content/data/scanner";
import { faqPage, scannerApp } from "@/lib/schema";

const meta = defineMeta("content/pages/home.mdx", rawMeta);

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: "/" },
};

// VW-013 order: hero (deadline hook) → problem → how it works → what the scan finds
// → proof → pricing teaser → FAQ (6) → CTA. All server-rendered; works without JS.
export default function Home() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={[scannerApp(scannerFeatures), faqPage(featuredFaq(), "/")]} />
      <Hero
        eyebrow="Visual FoxPro → .NET"
        title="Know exactly what your FoxPro application needs before the deadlines arrive."
        lead={
          <>
            Germany requires structured e-invoices from 2027. In the US, filing through FIRE ends on 19 November
            2026. A free, read-only scan shows what in your FoxPro code and data is affected. It runs on your PC, and
            your code never leaves it.
          </>
        }
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
        aside={<ScanPanel />}
      />

      <Section
        id="deadlines"
        eyebrow="Why now"
        title="Two deadlines that reach into old systems"
        intro="If your FoxPro application issues invoices to German businesses or files 1099s in the US, these dates apply to it."
        tone="muted"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FactBlock fact={facts.deIssue2027} />
          <FactBlock fact={facts.deIssue2028} />
          <FactBlock fact={facts.usFireLastDay} />
          <FactBlock fact={facts.usIrisOnly} />
        </div>
        <ul className="mt-6 flex flex-col gap-2 text-sm font-medium sm:flex-row sm:gap-6">
          <li>
            <Link href="/compliance/germany-xrechnung-2027" className="text-primary underline underline-offset-3">
              Germany: what FoxPro ERPs must change for e-invoicing
            </Link>
          </li>
          <li>
            <Link href="/compliance/us-irs-fire-to-iris" className="text-primary underline underline-offset-3">
              US: what changes for FoxPro 1099 exports
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          We explain what the rules mean for your application, not your legal obligations. Please confirm those with
          your tax adviser.
        </p>
      </Section>

      <Section id="how-it-works" eyebrow="How it works" title="From folder to migration plan in three steps">
        <Steps steps={homeSteps} />
      </Section>

      <Section
        id="what-it-finds"
        eyebrow="The scanner"
        title="What the scan finds"
        intro={
          <>
            Converters and estimates miss the logic FoxPro builds at run time. The scan finds it first.{" "}
            <Link href="/scanner" className="font-medium text-primary underline underline-offset-3">
              See everything it reads
            </Link>
            .
          </>
        }
        tone="muted"
      >
        <FeatureGrid items={homeFeatures} columns={2} />
      </Section>

      <Section id="proof" eyebrow="Tested on real code" title="What we measured">
        <ProofStats stats={homeStats} />
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Start free. Pay a fixed price for the plan."
        intro="The scan costs nothing. The assessment has a fixed price by application size, credited if you migrate."
        tone="muted"
      >
        <PricingTable tiers={tiers} />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Common questions">
        <div className="max-w-3xl">
          <Faq items={toFaqItems(featuredFaq())} />
          <p className="mt-6 text-sm">
            <Link href="/faq" className="font-medium text-primary underline underline-offset-3">
              All questions and answers
            </Link>
          </p>
        </div>
      </Section>

      <CtaBand
        title="Find out what your FoxPro application needs"
        body="Start with the free scan. It runs on your PC, and you decide what to share."
        primary={primaryCta}
        secondary={{ label: "Book an assessment", href: "/assessment" }}
      />
    </main>
  );
}
