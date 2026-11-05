import { ogImage } from "@/lib/og";

export const alt = "See what your FoxPro application contains — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Free scan", title: "See what your FoxPro application contains" });
}
