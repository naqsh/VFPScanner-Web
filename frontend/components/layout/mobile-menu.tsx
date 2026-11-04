"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { isActive, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Mobile menu (VW-010) on the native <dialog> element:
 * - showModal() makes the rest of the page inert, so focus stays in the menu (shown below lg = 1024px, so tablets get it too)
 * - Esc closes it (browser built-in) and focus returns to the menu button
 * - closes when a link is clicked or the route changes
 */
export function MobileMenu({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
      >
        <Menu aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-black/50 lg:hidden"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-semibold">Menu</span>
          <button
            type="button"
            onClick={close}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <X aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="px-4 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block rounded-md px-2 py-3 text-lg aria-[current=page]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={close}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            {cta.label}
          </Link>
        </nav>
      </dialog>
    </>
  );
}
