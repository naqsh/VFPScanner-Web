# Brand — VFPScanner Web

**Status:** final for v1 (VW-008, 2026-11-04 — owner chose the defaults). Domain still open.

## Name and domain

- Working product name: **VFP Migration Scanner** (tool) / **VFP Migration Assessment** (service)
- Public brand: **VFP Migration Scanner** (short form in tight spaces: "VFP Scanner")
- Domain: **TODO(decide)** — needed by VW-040
- Founder: Kashif — Senior .NET engineer, 15+ years, VFP → .NET migration specialist

## Positioning

> Find out exactly what your FoxPro application needs before the 2027 e-invoicing and IRS IRIS deadlines — with a scan that never leaves your PC.

- Lead with **deadlines and risk**, not "VFP is old"
- Calm, precise, engineer-to-engineer. No hype, no fear-mongering, no exclamation marks
- Show, don't claim: real scanner output, real patterns, real numbers from public test apps

## Voice

| Do | Don't |
|---|---|
| "The scan found 412 uses of macro substitution." | "Our revolutionary AI transforms your legacy!" |
| "Runs on your PC. Your code stays with you." | "Military-grade security" |
| Short sentences, concrete nouns | Buzzwords, vague promises |

## Visual direction

- Mood: dark, technical, calm — a precise instrument
- Base: deep navy / graphite; surfaces one step lighter
- Accent: **teal** — light theme `oklch(0.5 0.1 195)`, dark theme and stage `oklch(0.8 0.13 185)`
- Semantic: risk high = warm red, medium = amber, low = teal/green (never colour alone — add labels)
- Type: clean sans for text (e.g. Inter / Geist), monospace for code and file names (e.g. JetBrains Mono / Geist Mono)
- Follows the visitor's system light/dark setting (accessibility). Dark is the hero look: the `stage` surface (scanner visuals) is dark in both themes

## Logo

- Mark: rounded document frame, three code lines, a teal scan beam with a dot crossing it (original; `components/brand/logo.tsx`)
- Wordmark: "VFP Migration Scanner" in Geist semibold; compact "VFP Scanner" under 640px
- Favicon/app icon: `app/icon.svg` (mark on the stage colour)
- Clear space: at least the beam width around the mark; never recolour the beam other than the primary token

## Tokens (source: `frontend/app/globals.css`)

| Token | Use |
|---|---|
| background / foreground | Page and text |
| card, muted, border, input, ring | Surfaces, quiet areas, lines, focus |
| primary / primary-foreground | Main actions, links, eyebrow labels |
| accent / accent-foreground | Soft highlight (badges, icon tiles) |
| stage, stage-foreground, stage-muted, stage-accent | Always-dark panel for scanner visuals, proof stats, CTA band |
| risk-high / risk-medium / risk-low | Risk levels — always with a text label |

Type: Geist Sans (text), Geist Mono (code, file names, eyebrows), self-hosted. Scale shown on `/styleguide`.

## Motion language

- "Scan beam": a thin line passing over code/file names, revealing structure
- Data appears by counting up or drawing in — never bouncing
- Durations 200–600 ms, ease-out; long scenes scroll-linked, never autoplay loops that distract from reading

## Proof we can use (true, from the brief)

- Reads PJX, PRG, SCX, VCX, FRX, LBX, MNX, DBC, DBF with its own reader
- 13 migration-risk patterns; SQL Server type mapping for every field
- Flags invoice / VAT / 1099 / payroll / EDI data
- Tested on VFPX GoFish, PEMEditor, Thor and three public ERPs on GitHub; 19–28% of real ERP code was duplicates or old copies

## Never

- Name Macrosoft or its partners; use competitor logos
- Invent testimonials, client logos or counts
