import { facts } from "@/content/data/facts";
import { scanSteps } from "@/content/data/free-scan";
import { homeFeatures, homeStats, homeSteps } from "@/content/data/home";
import { complianceSignals, fileTypes, knownLimits, riskRules, SCANNER_VERSION } from "@/content/data/scanner";

import { allFaq } from "./faq";
import { indexablePages, type PageEntry, SECTION_ORDER } from "./pages";
import { formatPrice, tiers } from "./pricing";
import { abs } from "./schema";
import { site } from "./site";

/**
 * llms.txt and llms-full.txt (VW-025, https://llmstxt.org). Built from the
 * same sources as the pages, so AI answer engines read exactly what visitors see.
 */

const textOf = (n: unknown): string => (typeof n === "string" ? n : "");

export function keyFacts(): string[] {
  const f = Object.values(facts);
  return [
    "The scanner is free, read-only and runs on the customer's own PC; code and data never leave the machine.",
    `It reads FoxPro projects, programs, forms, class libraries, reports, labels, menus, databases and tables (PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC, DBF) with its own reader and finds ${riskRules.length} migration-risk patterns.`,
    "The paid Migration Assessment is a fixed-price review of 5 to 10 working days that turns the scan into a phased plan for .NET and SQL Server.",
    ...f.map((x) => `${x.effective}: ${textOf(x.statement)} (source: ${x.source.label}, ${x.source.href}; last reviewed ${x.lastReviewed})`),
  ];
}

export function buildLlmsTxt(): string {
  const pages = indexablePages();
  const out: string[] = [];
  out.push(`# ${site.name}`, "", `> ${site.description}`, "");
  out.push("Key facts:", "", ...keyFacts().map((k) => `- ${k}`), "");
  for (const section of SECTION_ORDER) {
    const inSection = pages.filter((p) => p.section === section);
    if (!inSection.length) continue;
    out.push(`## ${section}`, "");
    for (const p of inSection) out.push(`- [${p.meta.title}](${abs(p.path)}): ${p.meta.description}`);
    out.push("");
  }
  out.push("## Optional", "", `- [Full text of every page](${abs("/llms-full.txt")}): all public content in one plain-text file`, "");
  return out.join("\n");
}

/** MDX source → readable markdown: drops the `meta` export, imports and JSX comments. */
export function mdxToText(source: string): string {
  return source
    .replace(/^export const meta = \{[\s\S]*?\n\};\s*$/m, "")
    .replace(/^(import|export) .*$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Structured copy that lives in data files rather than MDX, per page. */
export function structuredText(path: string): string {
  const lines: string[] = [];
  switch (path) {
    case "/":
      lines.push("## How it works", ...homeSteps.map((s, i) => `${i + 1}. ${s.title}: ${textOf(s.body)}`), "");
      lines.push("## What the scan finds", ...homeFeatures.map((f) => `- ${f.title}: ${textOf(f.body)}`), "");
      lines.push("## What we measured", ...homeStats.map((s) => `- ${s.value} ${s.label} (${s.source})`));
      break;
    case "/scanner":
      lines.push(`Scanner version: ${SCANNER_VERSION}`, "", "## Files it reads");
      lines.push(...fileTypes.map((f) => `- ${f.ext}: ${f.what}`), "");
      lines.push(`## The ${riskRules.length} risk patterns`);
      lines.push(...riskRules.map((r) => `- ${r.title} [${r.severity}]: ${r.why}`), "");
      lines.push("## Compliance signals (names only, never values)");
      lines.push(...complianceSignals.map((s) => `- ${s.title}: ${s.why}`), "");
      lines.push("## Known limits", ...knownLimits.map((l) => `- ${l}`));
      break;
    case "/free-scan":
      lines.push("## Scan with the browser interface", ...scanSteps.map((s, i) => `${i + 1}. ${s.name}: ${s.text}`));
      break;
    case "/pricing":
      lines.push("## Plans (prices exclude VAT)");
      lines.push(...tiers.map((t) => `- ${t.name} — ${formatPrice(t.price)}: ${t.summary} ${t.features.join("; ")}.`));
      break;
    case "/faq":
      for (const f of allFaq) lines.push(`### ${f.question}`, f.answer, "");
      break;
  }
  return lines.join("\n").trim();
}

export function buildLlmsFullTxt(readSource: (file: string) => string): string {
  const out: string[] = [`# ${site.name} — full text`, "", `> ${site.description}`, ""];
  for (const p of indexablePages()) out.push(pageText(p, readSource), "", "---", "");
  return out.join("\n").trim() + "\n";
}

function pageText(p: PageEntry, readSource: (file: string) => string): string {
  const parts = [`# ${p.meta.title}`, "", `URL: ${abs(p.path)}`, `Last reviewed: ${p.meta.updated}`, "", p.meta.description];
  const body = mdxToText(readSource(p.file));
  if (body) parts.push("", body);
  const extra = structuredText(p.path);
  if (extra) parts.push("", extra);
  if (p.meta.faq.length && p.path !== "/faq") {
    parts.push("", "## FAQ");
    for (const f of p.meta.faq) parts.push(`### ${f.question}`, f.answer);
  }
  return parts.join("\n");
}
