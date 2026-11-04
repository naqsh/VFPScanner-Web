"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActive, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Desktop primary nav. Client only to mark the current page with aria-current. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                active && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
