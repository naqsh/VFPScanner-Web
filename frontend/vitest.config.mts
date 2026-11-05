import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // MDX before React so content files can be imported in tests like in Next.js
  plugins: [{ enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] }) }, react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "e2e/**", ".next/**"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/**", "app/api/**"],
      thresholds: { lines: 75, functions: 75, statements: 75, branches: 70 },
    },
  },
});
