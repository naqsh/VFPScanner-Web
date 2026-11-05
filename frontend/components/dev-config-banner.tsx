import type { FeatureStatus } from "@/lib/env";

/**
 * Shown only in `next dev` (VW-007): lists features whose env vars are not set,
 * so a missing key is obvious instead of failing silently later.
 */
export function DevConfigBanner({ statuses }: { statuses: FeatureStatus[] }) {
  const notReady = statuses.filter((s) => !s.ready);
  if (notReady.length === 0) return null;

  return (
    <div
      role="status"
      className="border-b border-risk-medium/40 bg-risk-medium/10 px-4 py-2 font-mono text-xs text-foreground"
    >
      <strong className="font-semibold">Dev config:</strong> features not configured yet:{" "}
      {notReady.map((s, i) => (
        <span key={s.feature}>
          {i > 0 ? ", " : null}
          <span title={s.missing.join(", ")}>{s.feature}</span>
        </span>
      ))}
      . See <code>.env.example</code>.
    </div>
  );
}
