import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Width and spacing for MDX body copy (element styles come from mdx-components.tsx). */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-3xl px-4 py-12 sm:px-6", className)}>{children}</div>;
}
