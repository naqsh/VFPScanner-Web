import type { MDXContent } from "mdx/types";

import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import type { Post } from "@/lib/blog";
import { primaryCta } from "@/lib/navigation";
import { article } from "@/lib/schema";

export function BlogPost({ post, Body }: { post: Post; Body: MDXContent }) {
  const path = `/blog/${post.slug}`;
  const { meta } = post;
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={article({
          path,
          type: "TechArticle",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.published ?? meta.updated,
          dateModified: meta.updated,
          about: post.about,
        })}
      />
      <PageHeader
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: meta.title, path },
        ]}
        eyebrow="Blog"
        title={meta.title}
        lead={meta.description}
        updated={meta.updated}
      />
      <article>
        <Prose>
          <p className="mb-8 text-sm text-muted-foreground">
            By Kashif · Published <time dateTime={meta.published}>{meta.published}</time>
          </p>
          <Body />
        </Prose>
      </article>
      <CtaBand
        title="See it in your own application"
        body="The free scan finds these patterns in your code and data, on your PC."
        primary={primaryCta}
        secondary={{ label: "All posts", href: "/blog" }}
      />
    </main>
  );
}
