import { buildLlmsFullTxt } from "@/lib/llms";
import { mdxSources } from "@/lib/mdx-sources";

async function fullText() {
  "use cache";
  return buildLlmsFullTxt((file) => mdxSources[file] ?? "");
}

// Prerendered at build; the text comes from the same MDX and data files as the pages.
export async function GET() {
  return new Response(await fullText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
