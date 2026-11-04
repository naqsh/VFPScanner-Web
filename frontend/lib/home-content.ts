import type { Feature } from "@/components/sections/feature-grid";
import type { Stat } from "@/components/sections/proof-stats";
import type { Step } from "@/components/sections/steps";

// Placeholder home copy (VW-E2). Moves to MDX in VW-012/VW-013.
// Every statement is from docs/BRAND.md "Proof we can use".

export const homeFeatures: Feature[] = [
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
    body: "We turn the scan into risks, effort and a phased plan for .NET and SQL Server in 5–10 working days.",
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
    label: "Of code in tested ERPs was duplicates or old copies",
    source: "Three public FoxPro ERPs on GitHub, scanned with v0.2",
  },
];
