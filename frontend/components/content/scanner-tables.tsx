import { Badge } from "@/components/ui/badge";
import type { FileType, RiskRule, Severity, Signal } from "@/content/data/scanner";

const severityVariant: Record<Severity, "high" | "medium" | "default"> = {
  High: "high",
  Medium: "medium",
  Info: "default",
};

export function FileTypeTable({ rows }: { rows: FileType[] }) {
  return (
    <div role="region" aria-label="File types" tabIndex={0} className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">FoxPro file types the scanner reads and what it extracts</caption>
        <thead>
          <tr className="border-b bg-muted/50">
            <th scope="col" className="px-4 py-3 font-semibold">Files</th>
            <th scope="col" className="px-4 py-3 font-semibold">What is extracted</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ext} className="border-b last:border-0">
              <th scope="row" className="px-4 py-3 align-top font-mono font-medium whitespace-nowrap">{r.ext}</th>
              <td className="px-4 py-3 text-muted-foreground">{r.what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RiskRuleTable({ rules }: { rules: RiskRule[] }) {
  return (
    <div role="region" aria-label="Risk patterns" tabIndex={0} className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">The {rules.length} migration-risk patterns the scanner finds</caption>
        <thead>
          <tr className="border-b bg-muted/50">
            <th scope="col" className="px-4 py-3 font-semibold">Pattern</th>
            <th scope="col" className="px-4 py-3 font-semibold">Severity</th>
            <th scope="col" className="px-4 py-3 font-semibold">Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <th scope="row" className="px-4 py-3 align-top font-medium">{r.title}</th>
              <td className="px-4 py-3 align-top">
                <Badge variant={severityVariant[r.severity]}>{r.severity}</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SignalList({ signals }: { signals: Signal[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {signals.map((s) => (
        <li key={s.id} className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.why}</p>
        </li>
      ))}
    </ul>
  );
}
