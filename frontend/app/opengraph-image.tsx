import { ogImage } from "@/lib/og";

export const alt = "Know exactly what your FoxPro application needs before the deadlines arrive. — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Visual FoxPro → .NET", title: "Know exactly what your FoxPro application needs before the deadlines arrive." });
}
