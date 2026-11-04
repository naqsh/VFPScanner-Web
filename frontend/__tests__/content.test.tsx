import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { render } from "@testing-library/react";
import type { MDXContent } from "mdx/types";
import { describe, expect, it } from "vitest";

import { facts } from "@/content/data/facts";
import { complianceSignals, riskRules } from "@/content/data/scanner";
import { ContentError, defineMeta, pageMetaSchema, pageMetadata } from "@/lib/content";
import { allFaq, faqByGroup, faqGroups, featuredFaq } from "@/lib/faq";

type MdxModule = { default: MDXContent; meta: unknown };
const files = import.meta.glob<MdxModule>("../content/pages/**/*.mdx", { eager: true });
// Read sources from disk: the MDX plugin would also transform `?raw` imports.
const ROOT = join(__dirname, "..");
const sourceFiles = ["content", "app", "components", "lib"].flatMap((dir) =>
  (readdirSync(join(ROOT, dir), { recursive: true }) as string[])
    .filter((f) => /\.(mdx|tsx?)$/.test(f))
    .map((f) => join(dir, f)),
);

describe("content metadata (every MDX file)", () => {
  it("finds the content files", () => {
    expect(Object.keys(files).length).toBeGreaterThanOrEqual(14);
  });

  for (const [path, mod] of Object.entries(files)) {
    it(`${path} has valid meta`, () => {
      const result = pageMetaSchema.safeParse(mod.meta);
      expect(result.success, result.success ? "" : JSON.stringify(result.error.issues, null, 2)).toBe(true);
    });
    it(`${path} renders`, () => {
      const Body = mod.default;
      expect(() => render(<Body />)).not.toThrow();
    });
  }

  it("legal pages are templates and therefore not indexed", () => {
    for (const [path, mod] of Object.entries(files)) {
      if (!path.includes("/legal/")) continue;
      const meta = defineMeta(path, mod.meta);
      expect(meta.template).toBe(true);
      expect(pageMetadata(meta, "/x").robots).toEqual({ index: false, follow: true });
    }
  });
});

describe("defineMeta", () => {
  it("fails with a message naming the file and the field", () => {
    expect(() => defineMeta("content/pages/broken.mdx", { title: "x", description: "short", updated: "nope" })).toThrow(
      ContentError,
    );
    try {
      defineMeta("content/pages/broken.mdx", { title: "Valid title", description: "too short", updated: "2026-11-04" });
    } catch (e) {
      expect(String(e)).toContain("content/pages/broken.mdx");
      expect(String(e)).toContain("description");
    }
  });

  it("rejects unknown keys (typos in meta)", () => {
    expect(() =>
      defineMeta("x.mdx", {
        title: "Valid title",
        description: "A description that is long enough to pass the minimum length rule.",
        updated: "2026-11-04",
        tittle: "typo",
      }),
    ).toThrow(/tittle|Unrecognized/);
  });
});

describe("FAQ", () => {
  it("has 20–30 answers, grouped, with 6 featured on the home page", () => {
    expect(allFaq.length).toBeGreaterThanOrEqual(20);
    expect(allFaq.length).toBeLessThanOrEqual(30);
    expect(featuredFaq()).toHaveLength(6);
    expect(faqGroups().reduce((n, g) => n + g.items.length, 0)).toBe(allFaq.length);
    expect(faqByGroup("Migration").length).toBeGreaterThan(0);
  });

  it("has unique questions", () => {
    const qs = allFaq.map((f) => f.question);
    expect(new Set(qs).size).toBe(qs.length);
  });
});

describe("truth in marketing", () => {
  it("never names a former employer", () => {
    expect(sourceFiles.length).toBeGreaterThan(20);
    for (const file of sourceFiles) {
      expect(readFileSync(join(ROOT, file), "utf8").toLowerCase(), file).not.toContain("macrosoft");
    }
  });

  it("matches the scanner: 13 risk rules and 5 compliance signals", () => {
    expect(riskRules).toHaveLength(13);
    expect(new Set(riskRules.map((r) => r.id)).size).toBe(13);
    expect(complianceSignals).toHaveLength(5);
  });

  it("only uses verified facts", () => {
    for (const fact of Object.values(facts)) {
      expect(fact.verified).toBe(true);
      expect(fact.source.href).toMatch(/^https:\/\//);
    }
  });
});
