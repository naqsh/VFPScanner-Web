import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LogoMark, Logo } from "@/components/brand/logo";
import { ScanPanel } from "@/components/brand/scan-panel";
import { CtaBand } from "@/components/sections/cta-band";
import { FactBlock } from "@/components/sections/fact-block";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PricingTable } from "@/components/sections/pricing-table";
import { ProofStats } from "@/components/sections/proof-stats";
import { Section } from "@/components/sections/section";
import { Steps } from "@/components/sections/steps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { homeFeatures, homeStats, homeSteps } from "@/lib/home-content";
import { PRICING_STATUS, tiers } from "@/lib/pricing";

// VW-009: internal style guide. Not indexed; not served on the Vercel production deployment.
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const colorTokens = [
  ["background", "bg-background"],
  ["foreground", "bg-foreground"],
  ["card", "bg-card"],
  ["muted", "bg-muted"],
  ["muted-foreground", "bg-muted-foreground"],
  ["primary", "bg-primary"],
  ["accent", "bg-accent"],
  ["border", "bg-border"],
  ["stage", "bg-stage"],
  ["stage-accent", "bg-stage-accent"],
  ["risk-high", "bg-risk-high"],
  ["risk-medium", "bg-risk-medium"],
  ["risk-low", "bg-risk-low"],
] as const;

const typeScale = [
  ["Display — text-5xl", "text-5xl font-semibold tracking-tight"],
  ["H2 — text-4xl", "text-4xl font-semibold tracking-tight"],
  ["H3 — text-xl", "text-xl font-semibold"],
  ["Lead — text-lg", "text-lg text-muted-foreground"],
  ["Body — text-base", "text-base"],
  ["Small — text-sm", "text-sm text-muted-foreground"],
  ["Mono — font-mono text-sm", "font-mono text-sm"],
] as const;

export default function StyleGuide() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <main id="main" className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">Internal · noindex</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Style guide</h1>
        <p className="mt-3 text-muted-foreground">
          Tokens, type and components from <code>docs/BRAND.md</code>. Switch your system light/dark setting to check
          both themes.
        </p>
      </div>

      <Section id="brand" title="Logo">
        <div className="flex flex-wrap items-center gap-8">
          <Logo />
          <LogoMark className="size-12" />
          <div className="rounded-xl bg-stage p-4 text-stage-foreground">
            <Logo />
          </div>
        </div>
      </Section>

      <Section id="colors" title="Colour tokens" tone="muted">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colorTokens.map(([name, cls]) => (
            <li key={name} className="rounded-xl border bg-card p-3">
              <div className={`h-14 rounded-lg ring-1 ring-border ${cls}`} />
              <p className="mt-2 font-mono text-xs">--{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" title="Type scale">
        <ul className="space-y-4">
          {typeScale.map(([label, cls]) => (
            <li key={label}>
              <p className="font-mono text-xs text-muted-foreground">{label}</p>
              <p className={cls}>Know what your FoxPro app needs</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="components" title="Components" tone="muted">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="high">Risk: high</Badge>
            <Badge variant="medium">Risk: medium</Badge>
            <Badge variant="low">Risk: low</Badge>
          </div>
          <Card>
            <CardTitle>Card title</CardTitle>
            <CardDescription className="mt-2">Card description text in the muted colour.</CardDescription>
          </Card>
          <label className="block text-sm font-medium">
            Work email
            <Input className="mt-1.5" type="email" placeholder="you@company.com" />
          </label>
        </div>
      </Section>

      <Section id="scan-panel" title="Scan panel (stage surface)">
        <div className="max-w-lg">
          <ScanPanel />
        </div>
      </Section>

      <Section id="features" title="FeatureGrid" tone="muted">
        <FeatureGrid items={homeFeatures} />
      </Section>

      <Section id="steps" title="Steps">
        <Steps steps={homeSteps} />
      </Section>

      <Section id="stats" title="ProofStats" tone="muted">
        <ProofStats stats={homeStats} />
      </Section>

      <Section id="pricing" title="PricingTable" intro={`Prices are ${PRICING_STATUS} (decision D3).`}>
        <PricingTable tiers={tiers} />
      </Section>

      <Section id="faq" title="FAQ" tone="muted">
        <Faq
          items={[
            { question: "Does my code leave my PC?", answer: "No. The scanner runs locally and is read-only." },
            {
              question: "Which files does it read?",
              answer: "PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC and DBF, with its own reader.",
            },
          ]}
        />
      </Section>

      <Section id="fact" title="FactBlock">
        <div className="max-w-2xl">
          <FactBlock
            fact={{
              effective: "Sample date",
              statement: "Sample fact block. Real facts come from the facts register in docs/SEO-GEO-PLAYBOOK.md.",
              source: { label: "Official source", href: "#fact" },
              lastReviewed: "2026-11-04",
              verified: false,
            }}
          />
        </div>
      </Section>

      <CtaBand
        title="CTA band"
        body="Primary and secondary actions on the stage surface."
        primary={{ label: "Primary action", href: "#main" }}
        secondary={{ label: "Secondary", href: "#main" }}
      />
    </main>
  );
}
