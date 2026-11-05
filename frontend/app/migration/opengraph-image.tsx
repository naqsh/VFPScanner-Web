import { ogImage } from "@/lib/og";

export const alt = "From Visual FoxPro to .NET and SQL Server, one module at a time — VFP Migration Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Migration", title: "From Visual FoxPro to .NET and SQL Server, one module at a time" });
}
