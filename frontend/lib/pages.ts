import { meta as aboutMeta } from "@/content/pages/about.mdx";
import { meta as blogMeta } from "@/content/pages/blog.mdx";
import { meta as deMeta } from "@/content/pages/compliance/germany-xrechnung-2027.mdx";
import { meta as usMeta } from "@/content/pages/compliance/us-irs-fire-to-iris.mdx";
import { meta as assessmentMeta } from "@/content/pages/assessment.mdx";
import { meta as contactMeta } from "@/content/pages/contact.mdx";
import { meta as faqMeta } from "@/content/pages/faq.mdx";
import { meta as freeScanMeta } from "@/content/pages/free-scan.mdx";
import { meta as homeMeta } from "@/content/pages/home.mdx";
import { meta as imprintMeta } from "@/content/pages/legal/imprint.mdx";
import { meta as privacyMeta } from "@/content/pages/legal/privacy.mdx";
import { meta as refundsMeta } from "@/content/pages/legal/refunds.mdx";
import { meta as termsMeta } from "@/content/pages/legal/terms.mdx";
import { meta as migrationMeta } from "@/content/pages/migration.mdx";
import { meta as pricingMeta } from "@/content/pages/pricing.mdx";
import { meta as retainerMeta } from "@/content/pages/retainer.mdx";
import { meta as scannerMeta } from "@/content/pages/scanner.mdx";

import { posts } from "./blog";
import { defineMeta, type PageMeta } from "./content";

/**
 * Registry of public pages (VW-025). Source for sitemap.xml, llms.txt and
 * llms-full.txt. A page that is `noindex` or a `template` is never listed.
 * Add new pages here when they are created.
 */

export type Section = "Start here" | "Services" | "Compliance" | "Blog" | "Company" | "Legal";

export type PageEntry = {
  path: string;
  /** content file, relative to frontend/ */
  file: string;
  meta: PageMeta;
  section: Section;
  /** sitemap priority hint, 0–1 */
  priority: number;
};

const entry = (path: string, file: string, raw: unknown, section: Section, priority: number): PageEntry => ({
  path,
  file,
  meta: defineMeta(file, raw),
  section,
  priority,
});

export const pages: PageEntry[] = [
  entry("/", "content/pages/home.mdx", homeMeta, "Start here", 1),
  entry("/scanner", "content/pages/scanner.mdx", scannerMeta, "Start here", 0.9),
  entry("/free-scan", "content/pages/free-scan.mdx", freeScanMeta, "Start here", 0.9),
  entry("/assessment", "content/pages/assessment.mdx", assessmentMeta, "Services", 0.9),
  entry("/migration", "content/pages/migration.mdx", migrationMeta, "Services", 0.8),
  entry("/retainer", "content/pages/retainer.mdx", retainerMeta, "Services", 0.6),
  entry("/pricing", "content/pages/pricing.mdx", pricingMeta, "Services", 0.8),
  entry("/compliance/germany-xrechnung-2027", "content/pages/compliance/germany-xrechnung-2027.mdx", deMeta, "Compliance", 0.9),
  entry("/compliance/us-irs-fire-to-iris", "content/pages/compliance/us-irs-fire-to-iris.mdx", usMeta, "Compliance", 0.9),
  entry("/blog", "content/pages/blog.mdx", blogMeta, "Blog", 0.6),
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, file: p.file, meta: p.meta, section: "Blog" as const, priority: 0.7 })),
  entry("/faq", "content/pages/faq.mdx", faqMeta, "Company", 0.7),
  entry("/about", "content/pages/about.mdx", aboutMeta, "Company", 0.6),
  entry("/contact", "content/pages/contact.mdx", contactMeta, "Company", 0.6),
  entry("/legal/privacy", "content/pages/legal/privacy.mdx", privacyMeta, "Legal", 0.2),
  entry("/legal/terms", "content/pages/legal/terms.mdx", termsMeta, "Legal", 0.2),
  entry("/legal/refunds", "content/pages/legal/refunds.mdx", refundsMeta, "Legal", 0.2),
  entry("/legal/imprint", "content/pages/legal/imprint.mdx", imprintMeta, "Legal", 0.2),
];

export function isIndexable(p: PageEntry): boolean {
  return !p.meta.noindex && !p.meta.template;
}

export function indexablePages(): PageEntry[] {
  return pages.filter(isIndexable);
}

export const SECTION_ORDER: Section[] = ["Start here", "Services", "Compliance", "Blog", "Company", "Legal"];
