import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not published yet",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">This page is not published yet</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The full site is being built. The page you asked for may not exist yet, or the address may be wrong.
      </p>
      <div className="mt-8">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
