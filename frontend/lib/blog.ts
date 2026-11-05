import { meta as dbfMeta } from "@/content/pages/blog/dbf-to-sql-server-data-types.mdx";
import { meta as macroMeta } from "@/content/pages/blog/macro-substitution-foxpro-migration.mdx";
import { meta as pjxMeta } from "@/content/pages/blog/foxpro-project-size-pjx.mdx";

import { defineMeta, type PageMeta } from "./content";

/** Blog posts (VW-028). Each post also has a static route in app/blog/<slug>/. Newest first. */
export type Post = { slug: string; file: string; meta: PageMeta; about: string[] };

const post = (slug: string, raw: unknown, about: string[]): Post => {
  const file = `content/pages/blog/${slug}.mdx`;
  return { slug, file, meta: defineMeta(file, raw), about };
};

export const posts: Post[] = [
  post("macro-substitution-foxpro-migration", macroMeta, ["Visual FoxPro", "Macro substitution", "C#", "Code migration"]),
  post("dbf-to-sql-server-data-types", dbfMeta, ["Visual FoxPro", "DBF", "SQL Server", "Data migration"]),
  post("foxpro-project-size-pjx", pjxMeta, ["Visual FoxPro", "PJX project file", "Migration estimate"]),
].sort((a, b) => (b.meta.published ?? "").localeCompare(a.meta.published ?? ""));

export function getPost(slug: string): Post {
  const p = posts.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown blog post: ${slug}`);
  return p;
}
