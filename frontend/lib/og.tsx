import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * Open Graph / Twitter share image template (VW-023). 1200×630, rendered at
 * build time (static). Fonts come from the self-hosted `geist` package, so no
 * network call is needed. Colours match the always-dark "stage" surface.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

const FONT_DIR = join(process.cwd(), "node_modules/geist/dist/fonts");

const STAGE = "#0f1420";
const FOREGROUND = "#eef1f7";
const MUTED = "#a9b1c2";
const ACCENT = "#35d0c0";

// Loaded once at module level (pattern from the Next.js opengraph-image docs) so the
// images can be prerendered at build time.
const [sans, mono] = await Promise.all([
  readFile(join(FONT_DIR, "geist-sans/Geist-SemiBold.ttf")),
  readFile(join(FONT_DIR, "geist-mono/GeistMono-Regular.ttf")),
]);
const FONTS = [
  { name: "Geist", data: sans, weight: 600 as const, style: "normal" as const },
  { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
];

export type OgInput = { eyebrow: string; title: string; footer?: string };

export function ogImage({ eyebrow, title, footer = "Runs on your PC · Your code never leaves it" }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: STAGE,
          color: FOREGROUND,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Logo mark: frame, code lines, scan beam */}
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect x="3" y="3" width="26" height="26" rx="7" fill="none" stroke={FOREGROUND} strokeWidth="2" />
            <path d="M9 11h8M9 16h12M9 21h6" stroke={FOREGROUND} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M22 7v18" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="22" cy="16" r="2.5" fill={ACCENT} />
          </svg>
          <div style={{ fontSize: 30 }}>VFP Migration Scanner</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 26, color: ACCENT, letterSpacing: 4, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 60 ? 58 : 66, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 24, color: MUTED }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT }} />
          {footer}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: FONTS },
  );
}
