import type { MetadataRoute } from "next";

import { indexablePages } from "@/lib/pages";
import { abs } from "@/lib/schema";

/** sitemap.xml (VW-025): indexable pages only; lastModified = the page's last content review. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages().map((p) => ({
    url: abs(p.path),
    lastModified: p.meta.updated,
    changeFrequency: p.section === "Compliance" ? "weekly" : "monthly",
    priority: p.priority,
  }));
}
