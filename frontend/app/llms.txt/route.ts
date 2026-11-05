import { buildLlmsTxt } from "@/lib/llms";

// Prerendered at build (Cache Components: GET handlers without runtime data are static).
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
