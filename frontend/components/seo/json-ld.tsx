import { type JsonLdNode, serializeJsonLd } from "@/lib/schema";

/** Renders JSON-LD (VW-024). Pass one node or several (emitted as an @graph). */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
