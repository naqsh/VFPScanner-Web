import localFont from "next/font/local";

/**
 * Geist Mono without preload (Lighthouse VW-029): it is only used for small labels,
 * code and the scan panel, so it must not compete with the body font and the hero
 * text for bandwidth on slow mobile connections. Same file and settings as
 * `geist/font/mono`, plus `preload: false` and `display: "swap"`.
 */
export const GeistMonoLazy = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: false,
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
});
