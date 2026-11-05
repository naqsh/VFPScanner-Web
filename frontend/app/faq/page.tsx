import { PageHeader } from "@/components/content/page-header";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import Body from "@/content/pages/faq.mdx";
import { pageMetadata } from "@/lib/content";
import { allFaq, faqGroups, faqMeta, toFaqItems } from "@/lib/faq";
import { primaryCta } from "@/lib/navigation";

export const metadata = pageMetadata(faqMeta, "/faq");

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function FaqPage() {
  const groups = faqGroups();
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="FAQ"
        title="Questions and answers"
        lead={`${allFaq.length} answers about the scanner, the assessment, migration and the compliance deadlines.`}
        updated={faqMeta.updated}
      />

      <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6">
        <nav aria-label="FAQ topics">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.group}>
                <a
                  href={`#${slug(g.group)}`}
                  className="inline-flex rounded-full border px-3 py-1 text-sm hover:bg-muted"
                >
                  {g.group}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map((g) => (
          <section key={g.group} id={slug(g.group)} aria-labelledby={`${slug(g.group)}-title`} className="scroll-mt-20 pt-10">
            <h2 id={`${slug(g.group)}-title`} className="mb-4 text-2xl font-semibold tracking-tight">
              {g.group}
            </h2>
            <Faq items={toFaqItems(g.items)} />
          </section>
        ))}
      </div>

      <Prose>
        <Body />
      </Prose>

      <CtaBand
        title="The fastest answer is the scan"
        body="It shows size, risk and data for your own application, on your own PC."
        primary={primaryCta}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </main>
  );
}
