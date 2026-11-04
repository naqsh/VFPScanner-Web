import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { primaryCta, primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="VFP Migration Scanner, home" className="rounded-md">
          <Logo compactOnMobile />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={primaryNav} />
        </nav>

        <div className="flex items-center gap-2">
          <Link href={primaryCta.href} className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            {primaryCta.label}
          </Link>
          <MobileMenu items={primaryNav} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
