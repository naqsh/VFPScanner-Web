import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Raw MDX sources for llms-full.txt. Each path is a literal so the bundler traces
 * only these files (a computed path would pull the whole project into the
 * deployment). Add a line when a page is added to lib/pages.ts; a unit test
 * fails if an indexable page is missing here.
 */
const read = (p: string) => readFileSync(p, "utf8");

export const mdxSources: Record<string, string> = {
  "content/pages/home.mdx": read(join(process.cwd(), "content/pages/home.mdx")),
  "content/pages/scanner.mdx": read(join(process.cwd(), "content/pages/scanner.mdx")),
  "content/pages/free-scan.mdx": read(join(process.cwd(), "content/pages/free-scan.mdx")),
  "content/pages/assessment.mdx": read(join(process.cwd(), "content/pages/assessment.mdx")),
  "content/pages/migration.mdx": read(join(process.cwd(), "content/pages/migration.mdx")),
  "content/pages/retainer.mdx": read(join(process.cwd(), "content/pages/retainer.mdx")),
  "content/pages/pricing.mdx": read(join(process.cwd(), "content/pages/pricing.mdx")),
  "content/pages/faq.mdx": read(join(process.cwd(), "content/pages/faq.mdx")),
  "content/pages/about.mdx": read(join(process.cwd(), "content/pages/about.mdx")),
  "content/pages/contact.mdx": read(join(process.cwd(), "content/pages/contact.mdx")),
  "content/pages/compliance/germany-xrechnung-2027.mdx": read(join(process.cwd(), "content/pages/compliance/germany-xrechnung-2027.mdx")),
  "content/pages/compliance/us-irs-fire-to-iris.mdx": read(join(process.cwd(), "content/pages/compliance/us-irs-fire-to-iris.mdx")),
  "content/pages/blog.mdx": read(join(process.cwd(), "content/pages/blog.mdx")),
  "content/pages/blog/macro-substitution-foxpro-migration.mdx": read(join(process.cwd(), "content/pages/blog/macro-substitution-foxpro-migration.mdx")),
  "content/pages/blog/dbf-to-sql-server-data-types.mdx": read(join(process.cwd(), "content/pages/blog/dbf-to-sql-server-data-types.mdx")),
  "content/pages/blog/foxpro-project-size-pjx.mdx": read(join(process.cwd(), "content/pages/blog/foxpro-project-size-pjx.mdx")),
  "content/pages/legal/privacy.mdx": read(join(process.cwd(), "content/pages/legal/privacy.mdx")),
  "content/pages/legal/terms.mdx": read(join(process.cwd(), "content/pages/legal/terms.mdx")),
  "content/pages/legal/refunds.mdx": read(join(process.cwd(), "content/pages/legal/refunds.mdx")),
  "content/pages/legal/imprint.mdx": read(join(process.cwd(), "content/pages/legal/imprint.mdx")),
};
