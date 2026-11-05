import type {
  Article,
  BreadcrumbList,
  FAQPage,
  HowTo,
  Offer,
  OfferCatalog,
  Organization,
  Person,
  Service,
  SoftwareApplication,
  WebSite,
} from "schema-dts";

import { SCANNER_VERSION } from "@/content/data/scanner";

import { getEnv } from "./env";
import type { Price, Tier } from "./pricing";
import { resolveSiteUrl, site } from "./site";

/**
 * JSON-LD builders (VW-024). Schema map: docs/SEO-GEO-PLAYBOOK.md §3.
 * Rules: only describe content that is visible on the page; prices come from
 * lib/pricing.ts; every URL is absolute.
 */

export const siteUrl = () => resolveSiteUrl(getEnv());
export const abs = (path: string) => new URL(path, siteUrl()).toString();

const ORG_ID = () => abs("/#organization");
const PERSON_ID = () => abs("/about#kashif");
const WEBSITE_ID = () => abs("/#website");

/** Any schema node built below (builders are typed with schema-dts; rendering only needs an object). */
export type JsonLdNode = object;

export function withContext<T extends object>(node: T): { "@context": "https://schema.org" } & T {
  return { "@context": "https://schema.org", ...node };
}

export function organization(): Organization {
  return {
    "@type": "Organization",
    "@id": ORG_ID(),
    name: site.name,
    url: abs("/"),
    logo: abs("/icon.svg"),
    description: site.description,
    founder: { "@id": PERSON_ID() },
    knowsAbout: ["Visual FoxPro", "Visual FoxPro migration", ".NET", "C#", "SQL Server", "XRechnung", "IRS IRIS"],
  };
}

export function website(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    url: abs("/"),
    name: site.name,
    inLanguage: "en",
    publisher: { "@id": ORG_ID() },
  };
}

export function person(): Exclude<Person, string> {
  return {
    "@type": "Person",
    "@id": PERSON_ID(),
    name: "Kashif",
    jobTitle: "Senior .NET engineer",
    description:
      "Senior .NET engineer with more than 15 years in fintech, banking, ERP, legal tech and shipping software, specialising in Visual FoxPro to .NET migrations.",
    worksFor: { "@id": ORG_ID() },
    knowsAbout: ["Visual FoxPro", "C#", ".NET", "SQL Server", "Legacy system modernization", "Azure DevOps"],
    url: abs("/about"),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbs(items: Crumb[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqPage(items: { question: string; answer: string }[], path: string): FAQPage {
  return {
    "@type": "FAQPage",
    url: abs(path),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function scannerApp(featureList: string[]): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": abs("/scanner#app"),
    name: site.name,
    url: abs("/scanner"),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, Linux, macOS",
    softwareVersion: SCANNER_VERSION,
    description:
      "Read-only scanner for Visual FoxPro applications: reads PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC and DBF files, finds 13 migration-risk patterns and profiles data for SQL Server. Runs locally.",
    featureList,
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
    publisher: { "@id": ORG_ID() },
  };
}

/** Offer for a tier, or undefined for quote-only tiers. Prices only from lib/pricing.ts. */
export function offerFor(tier: Tier, path: string): Offer | undefined {
  const p: Price = tier.price;
  if (p.kind === "quote") return undefined;
  if (p.kind === "free") {
    return { "@type": "Offer", name: tier.name, price: 0, priceCurrency: "EUR", url: abs(path) };
  }
  const spec = {
    "@type": "UnitPriceSpecification" as const,
    priceCurrency: p.currency,
    ...(p.from ? { minPrice: p.amount } : { price: p.amount }),
    ...(p.per === "month" ? { unitCode: "MON", unitText: "month" } : {}),
    valueAddedTaxIncluded: false,
  };
  return {
    "@type": "Offer",
    name: tier.name,
    url: abs(path),
    priceCurrency: p.currency,
    ...(p.from ? {} : { price: p.amount }),
    priceSpecification: spec,
    seller: { "@id": ORG_ID() },
  };
}

export function service(opts: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  tier?: Tier;
}): Service {
  const offer = opts.tier ? offerFor(opts.tier, opts.path) : undefined;
  return {
    "@type": "Service",
    "@id": abs(`${opts.path}#service`),
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": ORG_ID() },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "European Union" },
      { "@type": "Country", name: "United States" },
    ],
    ...(offer ? { offers: offer } : {}),
  };
}

export function offerCatalog(tiers: Tier[], path: string): OfferCatalog {
  return {
    "@type": "OfferCatalog",
    name: `${site.name} plans`,
    url: abs(path),
    itemListElement: tiers.flatMap((t) => {
      const o = offerFor(t, path);
      return o ? [o] : [];
    }),
  };
}

export function howTo(opts: { path: string; name: string; description: string; steps: { name: string; text: string }[] }): HowTo {
  return {
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    tool: [{ "@type": "HowToTool", name: "VFP Migration Scanner (vfpscan)" }],
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: abs(`${opts.path}#step-${i + 1}`),
    })),
  };
}

export function article(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  type?: "Article" | "TechArticle" | "BlogPosting";
  about?: string[];
}): Article {
  return {
    "@type": opts.type ?? "Article",
    headline: opts.headline,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en",
    image: abs(`${opts.path}/opengraph-image`),
    author: { "@id": PERSON_ID() },
    publisher: { "@id": ORG_ID() },
    ...(opts.about ? { about: opts.about.map((name) => ({ "@type": "Thing" as const, name })) } : {}),
  } as Article;
}

/** Serialise for a <script type="application/ld+json">: escape "<" so content can never close the tag. */
export function serializeJsonLd(data: JsonLdNode | JsonLdNode[]): string {
  const doc = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : withContext(data);
  return JSON.stringify(doc).replace(/</g, "\\u003c");
}
