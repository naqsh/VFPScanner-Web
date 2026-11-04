import { cn } from "@/lib/utils";

/**
 * Original mark (VW-008): a document frame with code lines and a scan beam
 * crossing it. Uses currentColor for the frame and the primary token for the beam,
 * so it follows the theme.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("size-7 shrink-0", className)}
    >
      <rect x="3" y="3" width="26" height="26" rx="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M9 11h8" />
        <path d="M9 16h12" />
        <path d="M9 21h6" />
      </g>
      <g className="text-primary">
        <path d="M22 7v18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="16" r="2.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Logo({ className, compactOnMobile = false }: { className?: string; compactOnMobile?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <LogoMark />
      {compactOnMobile ? (
        <>
          <span className="sm:hidden">VFP Scanner</span>
          <span className="hidden sm:inline">VFP Migration Scanner</span>
        </>
      ) : (
        <span>VFP Migration Scanner</span>
      )}
    </span>
  );
}
