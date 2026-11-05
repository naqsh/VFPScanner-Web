import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { FileTypeTable, RiskRuleTable, SignalList } from "@/components/content/scanner-tables";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Section } from "@/components/sections/section";
import { buttonVariants } from "@/components/ui/button";
import { complianceSignals, fileTypes, knownLimits, riskRules, SCANNER_VERSION, scannerFeatures } from "@/content/data/scanner";
import Body, { meta as rawMeta } from "@/content/pages/scanner.mdx";
import { defineMeta, pageMetadata } from "@/lib/content";
import { primaryCta } from "@/lib/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { scannerApp } from "@/lib/schema";

const meta = defineMeta("content/pages/scanner.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/scanner");

const cleanUp = [
  {
    title: "Exact duplicates",
    body: "Files with the same code once whitespace and case are ignored.",
  },
  {
    title: "Likely old copies",
    body: "Name variants of another file (quotes22.scx, frm_old.scx, _beta) and files in backup folders.",
  },
  {
    title: "Files outside every project",
    body: "Source files that no .pjx project includes. Some may be unused.",
  },
];

const dataProfile = [
  { title: "Rows and deleted rows", body: "Per table, so you know what really needs to move." },
  { title: "Fields and SQL Server types", body: "Every field with a proposed SQL Server type in the JSON output." },
  { title: "Code page and blank rates", body: "Character set issues and empty fields to sort out before migrating." },
  { title: "Data issues", body: "Problems to fix in the data before it goes into SQL Server." },
];

export default function ScannerPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={scannerApp(scannerFeatures)} />
      <PageHeader
        breadcrumbs={[{ name: "Scanner", path: "/scanner" }]}
        eyebrow={`The scanner · v${SCANNER_VERSION}`}
        title="See what your FoxPro application contains, without sending it anywhere"
        lead="A read-only scanner that reads FoxPro's own file formats, finds the code that makes migration hard, and profiles your data for SQL Server."
        actions={
          <>
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {primaryCta.label}
            </Link>
            <Link href="#sample-report" className={buttonVariants({ size: "lg", variant: "outline" })}>
              See a sample report
            </Link>
          </>
        }
      />

      <Prose>
        <Body />
      </Prose>

      <Section id="file-types" eyebrow="What it reads" title="Every part of a FoxPro application" tone="muted">
        <FileTypeTable rows={fileTypes} />
        <p className="mt-4 text-sm text-muted-foreground">FoxPro 2.x screens are detected and flagged.</p>
      </Section>

      <Section
        id="risk-patterns"
        eyebrow="Risk"
        title={`${riskRules.length} patterns that make migration harder`}
        intro="Comments and string literals are removed before matching, so commented-out code does not count."
      >
        <RiskRuleTable rules={riskRules} />
      </Section>

      <Section id="data" eyebrow="Data" title="A profile of every table" tone="muted">
        <FeatureGrid items={dataProfile} columns={2} />
      </Section>

      <Section
        id="clean-up"
        eyebrow="Clean-up"
        title="Code you may not need to migrate"
        intro="Real FoxPro applications carry many old copies. On two open-source ERPs we tested, 19–28% of the code was duplicates or copies. The size estimate uses what is left."
      >
        <FeatureGrid items={cleanUp} />
      </Section>

      <Section
        id="compliance"
        eyebrow="Compliance signals"
        title="Where regulated data lives"
        intro="Table, field, class and procedure names are matched. Only names are reported, never values."
        tone="muted"
      >
        <SignalList signals={complianceSignals} />
      </Section>

      <Section
        id="sample-report"
        eyebrow="Sample report"
        title="What the report looks like"
        intro="Real output for GoFish, an open-source VFPX tool, scanned with v0.2."
      >
        <figure className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Image
            src="/images/sample-report-gofish.webp"
            alt="Scan report for GoFish: medium size, high migration risk, 19 of 52 modules high or medium risk, 33,954 lines of code, and a table of risk patterns starting with 397 uses of macro substitution."
            width={2200}
            height={2600}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="border-t px-4 py-3 text-xs text-muted-foreground">
            Top of the one-page HTML report. The JSON file has the full detail behind every number.
          </figcaption>
        </figure>
      </Section>

      <Section id="limits" eyebrow="Honest limits" title="What it does not do yet" tone="muted">
        <ul className="max-w-3xl list-disc space-y-2 pl-6 marker:text-primary">
          {knownLimits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Run it on your application"
        body="Free, read-only, and your code stays on your PC."
        primary={primaryCta}
        secondary={{ label: "What the assessment adds", href: "/assessment" }}
      />
    </main>
  );
}
