import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import robots, { AI_CRAWLERS } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { posts } from "@/lib/blog";
import { allFaq } from "@/lib/faq";
import { buildLlmsFullTxt, buildLlmsTxt, mdxToText } from "@/lib/llms";
import { mdxSources } from "@/lib/mdx-sources";
import { indexablePages, pages } from "@/lib/pages";
import { tiers } from "@/lib/pricing";
import {
  breadcrumbs,
  faqPage,
  offerCatalog,
  offerFor,
  organization,
  person,
  scannerApp,
  serializeJsonLd,
  service,
} from "@/lib/schema";

const ROOT = join(__dirname, "..");
const tier = (id: string) => tiers.find((t) => t.id === id)!;

describe("page registry", () => {
  it("every registered page has a route file and an MDX source for llms-full.txt", () => {
    for (const p of pages) {
      const route = p.path === "/" ? "app/page.tsx" : `app${p.path}/page.tsx`;
      expect(existsSync(join(ROOT, route)), route).toBe(true);
      expect(mdxSources[p.file], `lib/mdx-sources.ts is missing ${p.file}`).toBeTypeOf("string");
    }
  });

  it("titles are at most 60 and descriptions at most 155 characters", () => {
    for (const p of pages) {
      expect(p.meta.title.length, p.path).toBeLessThanOrEqual(60);
      expect(p.meta.description.length, p.path).toBeLessThanOrEqual(155);
    }
  });

  it("templates and noindex pages are never indexable", () => {
    const paths = indexablePages().map((p) => p.path);
    expect(paths).not.toContain("/legal/privacy");
    expect(paths).toContain("/compliance/germany-xrechnung-2027");
    expect(paths).toContain("/compliance/us-irs-fire-to-iris");
    for (const p of posts) expect(paths).toContain(`/blog/${p.slug}`);
  });
});

describe("sitemap and robots", () => {
  it("sitemap lists exactly the indexable pages with absolute URLs", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toHaveLength(indexablePages().length);
    expect(urls.every((u) => /^https?:\/\//.test(u))).toBe(true);
    expect(urls.some((u) => u.includes("/legal/"))).toBe(false);
    expect(urls.some((u) => u.includes("/styleguide"))).toBe(false);
  });

  it("robots welcomes AI crawlers and keeps internal pages out", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const ai = rules.find((x) => Array.isArray(x.userAgent));
    expect(ai?.userAgent).toEqual(AI_CRAWLERS);
    expect(AI_CRAWLERS).toEqual(expect.arrayContaining(["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]));
    for (const rule of rules) expect(rule.disallow).toEqual(expect.arrayContaining(["/styleguide", "/api/"]));
    expect(String(r.sitemap)).toMatch(/\/sitemap\.xml$/);
  });
});

describe("JSON-LD", () => {
  it("escapes < so content can never close the script tag", () => {
    const out = serializeJsonLd({ "@type": "Thing", name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });

  it("wraps several nodes in one @graph with @context", () => {
    const doc = JSON.parse(serializeJsonLd([organization(), person()]));
    expect(doc["@context"]).toBe("https://schema.org");
    expect(doc["@graph"].map((n: { "@type": string }) => n["@type"])).toEqual(["Organization", "Person"]);
  });

  it("offer prices come from lib/pricing.ts", () => {
    const assessment = offerFor(tier("assessment"), "/assessment") as unknown as Record<string, unknown>;
    const spec = assessment.priceSpecification as unknown as Record<string, unknown>;
    const price = tier("assessment").price;
    expect(price.kind).toBe("fixed");
    if (price.kind === "fixed") {
      expect(spec.minPrice).toBe(price.amount);
      expect(spec.priceCurrency).toBe(price.currency);
    }
    expect(spec.valueAddedTaxIncluded).toBe(false);

    const retainer = offerFor(tier("retainer"), "/retainer") as unknown as Record<string, unknown>;
    expect((retainer.priceSpecification as Record<string, unknown>).unitCode).toBe("MON");

    expect(offerFor(tier("migration"), "/migration")).toBeUndefined();
    expect((offerFor(tier("free-scan"), "/free-scan") as unknown as Record<string, unknown>).price).toBe(0);
    expect((offerCatalog(tiers, "/pricing").itemListElement as unknown[]).length).toBe(3);
  });

  it("service, app, FAQ and breadcrumbs carry the expected shape", () => {
    const svc = service({ path: "/assessment", name: "A", serviceType: "B", description: "C", tier: tier("assessment") });
    expect(svc).toMatchObject({ "@type": "Service", url: expect.stringMatching(/\/assessment$/) });
    expect(scannerApp(["x"])).toMatchObject({ "@type": "SoftwareApplication", operatingSystem: "Windows, Linux, macOS" });
    const faq = faqPage(allFaq.slice(0, 3), "/faq") as unknown as { mainEntity: unknown[] };
    expect(faq.mainEntity).toHaveLength(3);
    const bc = breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]) as unknown as { itemListElement: { position: number }[] };
    expect(bc.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });
});

describe("llms.txt and llms-full.txt", () => {
  it("llms.txt lists every indexable page and the verified deadlines, and no templates", () => {
    const txt = buildLlmsTxt();
    expect(txt.startsWith("# VFP Migration Scanner")).toBe(true);
    for (const p of indexablePages()) expect(txt).toContain(p.meta.title);
    expect(txt).not.toContain("Privacy policy");
    expect(txt).toContain("19 November 2026, 3 p.m. ET");
    expect(txt).toContain("/llms-full.txt");
  });

  it("mdxToText drops the meta export and JSX comments", () => {
    const out = mdxToText('export const meta = {\n  title: "x",\n};\n\n{/* note */}\n## Heading\n\nText');
    expect(out).toBe("## Heading\n\nText");
  });

  it("llms-full.txt has the body of every indexable page plus scanner data and the FAQ", () => {
    const full = buildLlmsFullTxt((f) => mdxSources[f] ?? "");
    for (const p of indexablePages()) expect(full).toContain(`# ${p.meta.title}`);
    expect(full).toContain("Macro substitution (&var) [High]");
    expect(full).toContain("## How IRIS filing works");
    expect(full).toContain("Does my source code leave my PC?");
    expect(full).not.toContain("[Full legal name");
    expect(full).not.toContain("export const meta");
  });
});
