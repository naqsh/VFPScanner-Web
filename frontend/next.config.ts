import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { securityHeaders } from "./lib/security-headers";

const isDev = process.env.NODE_ENV !== "production";

// Vercel deploy: do NOT set `output: "standalone"` (frontend/AGENT.md).
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // MDX is imported from content/ (not used as routes), so pageExtensions stay default.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(isDev) }];
  },
};

// Plugins as strings so Turbopack can use them (node_modules/next/dist/docs/01-app/02-guides/mdx.md).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
