import { ogImage } from "@/lib/og";

export const alt = "Macro substitution: the #1 FoxPro migration risk \u2014 VFP Migration Scanner blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "Macro substitution: the #1 FoxPro migration risk" });
}
