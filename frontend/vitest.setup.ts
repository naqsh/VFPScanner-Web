import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// RTL only auto-cleans with Vitest globals on; we keep globals off, so clean up explicitly.
afterEach(() => cleanup());

// jsdom has no <dialog> modal API: minimal stand-in so the mobile menu can be unit tested.
// Real behaviour (inert page, Esc, focus return) is covered by Playwright in e2e/layout.spec.ts.
if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.showModal ??= function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
