import type { Metadata } from "next";
import { z } from "zod";

/**
 * Content pipeline (VW-012).
 *
 * Each page's copy lives in `content/pages/<slug>.mdx` and exports
 *   export const meta = { title, description, updated, faq?, noindex?, template? }
 * `defineMeta()` validates it with Zod at import time, so a bad file fails the
 * build with a message that names the file and the field.
 */

export const faqItemSchema = z
  .object({
    question: z.string().trim().min(5).max(160),
    answer: z.string().trim().min(10).max(1200),
    group: z.string().trim().min(2).optional(),
    /** shown on the home page as well */
    featured: z.boolean().default(false),
  })
  .strict();

export const pageMetaSchema = z
  .object({
    /** <title> before the site suffix; keep short for search results */
    title: z.string().trim().min(3).max(60),
    /** meta description: one or two sentences, 50–155 characters (search results cut longer text) */
    description: z.string().trim().min(50).max(155),
    /** last content review, YYYY-MM-DD */
    updated: z.iso.date(),
    /** first publication (articles, compliance pages, blog), YYYY-MM-DD */
    published: z.iso.date().optional(),
    faq: z.array(faqItemSchema).default([]),
    noindex: z.boolean().default(false),
    /** legal/other templates that must be reviewed by the owner before launch */
    template: z.boolean().default(false),
  })
  .strict();

export type FaqEntry = z.infer<typeof faqItemSchema>;
export type PageMeta = z.infer<typeof pageMetaSchema>;

export class ContentError extends Error {
  constructor(file: string, issues: string[]) {
    super(`Invalid content metadata in ${file}:\n- ${issues.join("\n- ")}`);
    this.name = "ContentError";
  }
}

export function defineMeta(file: string, raw: unknown): PageMeta {
  const result = pageMetaSchema.safeParse(raw);
  if (!result.success) {
    throw new ContentError(
      file,
      result.error.issues.map((i) => `${i.path.length ? i.path.join(".") : "(root)"}: ${i.message}`),
    );
  }
  return result.data;
}

/** Next.js Metadata for a content page. Templates are never indexed. */
export function pageMetadata(meta: PageMeta, path: string): Metadata {
  const noindex = meta.noindex || meta.template;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: { title: meta.title, description: meta.description, url: path, type: "website" },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
