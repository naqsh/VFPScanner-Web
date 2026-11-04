const fileTypes = ["pjx", "prg", "scx", "vcx", "frx", "lbx", "mnx", "dbc", "dbf"];

/** Static scanner panel on the always-dark stage. Animated version comes in VW-019. */
export function ScanPanel() {
  return (
    <figure
      aria-label="File types the scanner reads"
      className="rounded-2xl bg-stage p-5 font-mono text-sm text-stage-foreground shadow-lg ring-1 ring-white/10"
    >
      <figcaption className="flex items-center gap-2 text-xs text-stage-muted">
        <span aria-hidden="true" className="size-2 rounded-full bg-stage-accent" />
        vfpscan — files it reads
      </figcaption>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {fileTypes.map((ext) => (
          <li key={ext} className="rounded-md border border-white/10 px-2 py-1.5 text-center">
            .{ext}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-stage-muted">
        <span className="text-stage-accent">→</span> code units, forms, classes, reports, tables, fields and proposed
        SQL Server types
      </p>
    </figure>
  );
}
