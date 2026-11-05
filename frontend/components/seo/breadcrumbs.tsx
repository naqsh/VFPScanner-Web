import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { breadcrumbs, type Crumb } from "@/lib/schema";

import { JsonLd } from "./json-ld";

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD (schema only for what is shown). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-foreground hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbs(trail)} />
    </>
  );
}
