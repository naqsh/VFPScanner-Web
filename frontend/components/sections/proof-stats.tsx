/**
 * Proof numbers. Truth-in-marketing rule: only facts listed in
 * docs/BRAND.md "Proof we can use". Every stat needs a `source` note.
 */
export type Stat = { value: string; label: string; source: string };

export function ProofStats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl bg-stage p-6 text-stage-foreground ring-1 ring-white/10">
          <dt className="text-sm text-stage-muted">{stat.label}</dt>
          <dd className="mt-2 font-mono text-4xl font-semibold tracking-tight text-stage-accent">{stat.value}</dd>
          <dd className="mt-3 text-xs text-stage-muted">{stat.source}</dd>
        </div>
      ))}
    </dl>
  );
}
