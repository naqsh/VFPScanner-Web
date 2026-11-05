/**
 * Scanner facts, copied from the scanner itself (VFPScanner v0.2):
 * README.md "What it reads", Rules.cs `Rules.All` and `Rules.Signals`.
 * Update together with the scanner. Do not add rules here that the tool does not have.
 */

export const SCANNER_VERSION = "0.2";

/** Short feature list (SoftwareApplication JSON-LD and summaries). */
export const scannerFeatures = [
  "Reads PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC and DBF files with its own reader",
  "Finds 13 migration-risk patterns, file by file",
  "Profiles every table with proposed SQL Server types",
  "Finds duplicates, old copies and files outside any project",
  "Flags invoice, VAT, 1099, payroll and EDI data by name, never by value",
  "Runs locally and read-only; sends nothing over the network",
];

export type FileType = { ext: string; what: string };

export const fileTypes: FileType[] = [
  { ext: ".pjx", what: "Files by type, main program, excluded files, files missing from the folder" },
  { ext: ".prg .qpr .mpr", what: "Code lines, procedures, risk patterns" },
  { ext: ".scx / .vcx", what: "Forms, classes, base classes, ActiveX controls, method code per class" },
  { ext: ".frx / .lbx", what: "Field expressions, groups, variables, complexity" },
  { ext: ".mnx", what: "Menu items, commands and procedures" },
  { ext: ".dbc", what: "Tables, views, connections, relations, stored procedures" },
  { ext: ".dbf", what: "Rows, deleted rows, fields, code page, blank rates, data issues, SQL Server type mapping" },
  { ext: ".app .exe .fxp", what: "Compiled files without source (flagged so you can confirm the source exists)" },
];

export type Severity = "High" | "Medium" | "Info";
export type RiskRule = { id: string; title: string; severity: Severity; why: string };

export const riskRules: RiskRule[] = [
  { id: "macro", title: "Macro substitution (&var)", severity: "High", why: "Builds code or names at run time. Cannot be translated line by line; each use needs manual redesign." },
  { id: "eval", title: "EVALUATE / EXECSCRIPT", severity: "High", why: "Runs code held in strings or tables. Hidden logic that static analysis and converters miss." },
  { id: "win32", title: "Windows API declarations (DECLARE … IN)", severity: "High", why: "Direct calls into Windows DLLs. Each needs a .NET equivalent or P/Invoke review." },
  { id: "com", title: "COM / ActiveX objects", severity: "Medium", why: "Depends on installed COM components (Excel, Outlook, scripting, third-party controls). Must be replaced or wrapped." },
  { id: "workarea", title: "Work-area table commands (USE, SEEK, SCAN, REPLACE …)", severity: "Medium", why: "Record-at-a-time DBF navigation. Must be rewritten as set-based SQL or repository code." },
  { id: "public", title: "PUBLIC variables", severity: "Medium", why: "Global state shared across the application. Hard to trace and to test after migration." },
  { id: "shell", title: "Shell / external programs (RUN, ShellExecute)", severity: "Medium", why: "Launches other programs. Often hidden dependencies on desktop tools." },
  { id: "dynform", title: "Run-time form or class building (ADDOBJECT, NEWOBJECT)", severity: "Medium", why: "UI built in code at run time. Designers and converters cannot see it." },
  { id: "sqlpt", title: "SQL pass-through (SQLEXEC / SQLCONNECT)", severity: "Info", why: "Already talks to a SQL database. Usually easier to migrate; queries can often be reused." },
  { id: "setstate", title: "Global SET commands (EXACT, DELETED, ANSI, NEAR …)", severity: "Info", why: "Changes how comparisons, dates and deleted rows behave everywhere. Results can differ silently after migration." },
  { id: "fileio", title: "Low-level file I/O (FOPEN, STRTOFILE …)", severity: "Info", why: "Writes or reads files directly (exports, interfaces, logs). Each is an integration point to re-test." },
  { id: "report", title: "REPORT FORM / LABEL FORM calls", severity: "Info", why: "Each FRX report needs a new reporting solution (SSRS, a PDF library, etc.)." },
  { id: "errors", title: "ON ERROR / global error handling", severity: "Info", why: "Global event and error traps that change control flow application-wide." },
];

export type Signal = { id: string; title: string; why: string };

export const complianceSignals: Signal[] = [
  { id: "invoice", title: "Invoices (e-invoicing: XRechnung, KSeF, Factur-X)", why: "The application stores or produces invoices. In Germany, issuing structured e-invoices becomes mandatory in 2027 and 2028." },
  { id: "vat", title: "VAT / tax IDs", why: "VAT identifiers are required fields in EN 16931 e-invoices; missing or messy values block compliance." },
  { id: "us1099", title: "US information returns (1099 / W-2 / TIN)", why: "Payee and tax-ID data for IRS information returns, which must be e-filed through IRIS from 2027." },
  { id: "payroll", title: "Payroll", why: "Payroll data is regulated and sensitive; often the highest-risk module in a migration." },
  { id: "edi", title: "EDI / trading partner documents", why: "Electronic document exchange with customers or suppliers. Format changes must keep partners connected." },
];

export const knownLimits: string[] = [
  "Abbreviated VFP commands (for example REPL for REPLACE) are not all matched.",
  "[…] string literals are not stripped before matching.",
  "Report expressions are counted, not analysed as code.",
  "No business-rule extraction yet. It is planned as an opt-in, AI-assisted part of the paid assessment.",
];
