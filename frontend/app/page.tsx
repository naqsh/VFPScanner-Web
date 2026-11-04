import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/site";

// VW-002 placeholder home. Real home page is built in VW-013.
// Every statement here comes from docs/VFPScanner-Web_Proposal.md §2 / docs/BRAND.md "Proof we can use".

const fileTypes = ["PJX", "PRG", "SCX", "VCX", "FRX", "LBX", "MNX", "DBC", "DBF"];

const points = [
  {
    title: "Reads the whole application",
    body: "Projects, programs, forms, class libraries, reports, menus, databases and tables, with its own reader.",
  },
  {
    title: "Finds migration risk",
    body: "13 risk patterns, such as macro substitution, EVALUATE, Win32 DECLARE and COM objects, located file by file.",
  },
  {
    title: "Runs on your PC",
    body: "Read-only and local. Your source code and data never leave your machine.",
  },
];

export default function Home() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="font-mono text-sm font-semibold tracking-tight">
          {site.shortName}
          <span className="text-primary">_</span>
        </span>
        <Badge variant="accent">Full site launching soon</Badge>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-20">
        <div>
          <p className="font-mono text-xs tracking-widest text-primary uppercase">Visual FoxPro → .NET</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{site.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            A read-only scanner that maps your FoxPro code, data and migration risk, then a fixed-price assessment
            that turns the scan into a migration plan for .NET and SQL Server.
          </p>
        </div>

        <figure
          aria-label="What the scanner reads"
          className="rounded-2xl bg-stage p-5 font-mono text-sm text-stage-foreground shadow-lg ring-1 ring-white/10"
        >
          <figcaption className="flex items-center gap-2 text-xs text-stage-muted">
            <span aria-hidden className="size-2 rounded-full bg-stage-accent" />
            vfpscan — files it reads
          </figcaption>
          <ul className="mt-4 grid grid-cols-3 gap-2">
            {fileTypes.map((ext) => (
              <li key={ext} className="rounded-md border border-white/10 px-2 py-1.5 text-center">
                .{ext.toLowerCase()}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-stage-muted">
            <span className="text-stage-accent">→</span> code units, forms, classes, reports, tables, fields and
            proposed SQL Server types
          </p>
        </figure>
      </section>

      <section aria-labelledby="what-it-does" className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="what-it-does" className="sr-only">
          What the scanner does
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((p) => (
            <Card key={p.title}>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription className="mt-2">{p.body}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © 2026 {site.name}
        </div>
      </footer>
    </main>
  );
}
