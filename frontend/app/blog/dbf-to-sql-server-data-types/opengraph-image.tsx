import { ogImage } from "@/lib/og";

export const alt = "DBF to SQL Server: data types and the traps \u2014 VFP Migration Scanner blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "DBF to SQL Server: data types and the traps" });
}
