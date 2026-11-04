import type { NextConfig } from "next";

import { securityHeaders } from "./lib/security-headers";

const isDev = process.env.NODE_ENV !== "production";

// Vercel deploy: do NOT set `output: "standalone"` (frontend/AGENT.md).
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
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

export default nextConfig;
