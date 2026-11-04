import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/pricing" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));

import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLinks } from "@/components/layout/nav-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { footerNav, primaryCta, primaryNav } from "@/lib/navigation";

beforeEach(() => {
  nav.pathname = "/pricing";
});

describe("NavLinks", () => {
  it("marks only the current page with aria-current", () => {
    render(<NavLinks items={primaryNav} />);
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Scanner" })).not.toHaveAttribute("aria-current");
  });
});

describe("MobileMenu", () => {
  it("opens, reports expanded state and closes on link click", () => {
    const { container } = render(<MobileMenu items={primaryNav} cta={primaryCta} />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    const dialog = container.querySelector("dialog") as HTMLDialogElement;

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(dialog).toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("link", { name: "Scanner" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with the close button", () => {
    const { container } = render(<MobileMenu items={primaryNav} cta={primaryCta} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close menu", hidden: true }));
    expect(container.querySelector("dialog")).not.toHaveAttribute("open");
  });
});

describe("SiteHeader and SiteFooter", () => {
  it("header has home link, primary nav and CTA", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: primaryCta.label })[0]).toHaveAttribute("href", primaryCta.href);
  });

  it("footer renders every group as a labelled nav", () => {
    render(<SiteFooter />);
    for (const g of footerNav) expect(screen.getByRole("navigation", { name: g.title })).toBeInTheDocument();
  });
});
