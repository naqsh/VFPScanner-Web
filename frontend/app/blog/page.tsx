import Link from "next/link";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import Body, { meta as rawMeta } from "@/content/pages/blog.mdx";
import { posts } from "@/lib/blog";
import { defineMeta, pageMetadata } from "@/lib/content";

const meta = defineMeta("content/pages/blog.mdx", rawMeta);
export const metadata = pageMetadata(meta, "/blog");

export default function BlogIndex() {
  return (
    <main id="main" className="flex-1">
      <PageHeader breadcrumbs={[{ name: "Blog", path: "/blog" }]} eyebrow="Blog" title="FoxPro migration in practice" lead={meta.description} />
      <div className="mx-auto w-full max-w-3xl px-4 pt-12 sm:px-6">
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="relative rounded-xl border bg-card p-6 transition-colors hover:border-primary/50">
                <p className="text-xs text-muted-foreground">
                  <time dateTime={p.meta.published}>{p.meta.published}</time>
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                    {p.meta.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.meta.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <Prose className="pt-8">
        <Body />
      </Prose>
    </main>
  );
}
