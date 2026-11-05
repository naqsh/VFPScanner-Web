import { meta as rawFaqMeta } from "@/content/pages/faq.mdx";

import { defineMeta, type FaqEntry } from "./content";

/** Master FAQ (content/pages/faq.mdx). Other pages show slices of it, so answers exist once. */
export const faqMeta = defineMeta("content/pages/faq.mdx", rawFaqMeta);

export const allFaq: FaqEntry[] = faqMeta.faq;

export function featuredFaq(): FaqEntry[] {
  return allFaq.filter((f) => f.featured);
}

export function faqByGroup(group: string): FaqEntry[] {
  return allFaq.filter((f) => f.group === group);
}

export function faqGroups(): { group: string; items: FaqEntry[] }[] {
  const order: string[] = [];
  for (const f of allFaq) if (f.group && !order.includes(f.group)) order.push(f.group);
  return order.map((group) => ({ group, items: faqByGroup(group) }));
}

/** FaqEntry → props for the Faq section component. */
export function toFaqItems(entries: FaqEntry[]) {
  return entries.map((e) => ({ question: e.question, answer: e.answer }));
}
