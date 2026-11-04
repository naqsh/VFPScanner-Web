import type { Feature } from "@/components/sections/feature-grid";
import type { Stat } from "@/components/sections/proof-stats";
import type { Step } from "@/components/sections/steps";

// Home page structured copy (VW-013). Every statement is checked against the scanner
// (VFPScanner v0.2 README / Rules.cs) and docs/BRAND.md "Proof we can use".

/** "What the scan finds" */
export const homeFeatures: Feature[] = [
  {
    title: "13 migration-risk patterns",
    body: "Macro substitution, EVALUATE, Windows API calls, COM objects, record-at-a-time table code and more, counted file by file with why each one matters.",
  },
  {
    title: "A data profile for SQL Server",
    body: "Every table and field with row counts, deleted rows, blank rates, code page, data issues and a proposed SQL Server type.",
  },
  {
    title: "Code you may not need to migrate",
    body: "Exact duplicates, old copies such as _old and _beta files, and source files that are not in any project.",
  },
  {
    title: "Compliance signals",
    body: "Where invoice, VAT, 1099, payroll and EDI data live, found from table, field and procedure names. Values are never read into the report.",
  },
];

export const homeSteps: Step[] = [
  {
    title: "Run the free scan",
    body: "Download the scanner and point it at your application folder. It reads everything and changes nothing.",
  },
  {
    title: "Review the report",
    body: "You get a one-page HTML report and a full JSON file. Share them with us only if you want to.",
  },
  {
    title: "Get a fixed-price assessment",
    body: "We turn the scan into risks, a data migration map and a phased plan for .NET and SQL Server in 5–10 working days.",
  },
];

export const homeStats: Stat[] = [
  { value: "9", label: "FoxPro file types read", source: "PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC and DBF" },
  {
    value: "13",
    label: "Migration-risk patterns detected",
    source: "From macro substitution to COM objects and Win32 calls",
  },
  {
    value: "19–28%",
    label: "Of code in two tested ERPs was duplicates or old copies",
    source: "Two open-source FoxPro ERPs on GitHub, scanned with v0.2",
  },
];
