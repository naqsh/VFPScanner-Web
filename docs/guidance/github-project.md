# GitHub Project board — VFPScanner Web

The board at **github.com/naqsh/VFPScanner-Web → Projects → "VFPScanner Web"** is generated from the plan, so the JSON tickets stay the source of truth.

| Source | Becomes |
|---|---|
| `docs/jira-tickets-json/VW-E*.json` — Epic | Issue `[VW-E1] Foundation` (label `epic`) + milestone `VW-E1 Foundation` |
| … — Task | Issue `[VW-001] …` (label `task`), sub-issue of its epic, same milestone |
| `docs/github/project-status.json` → `ownerIssues` | Issues `[OWNER-n] …` (label `owner-action`) |
| `docs/github/project-status.json` → `status` | Board **Status** (Todo / In Progress / Done); Done issues are closed |

Board fields: **Status**, **Epic** (VW-E1 … VW-E7, Owner), **Effort** (from the ticket), **Ticket** (VW-001 …).

## First run (Windows, PowerShell)

```powershell
winget install --id GitHub.cli        # once, if `gh` is not installed; reopen the terminal after
gh auth login                         # once: GitHub.com → HTTPS → log in with browser
gh auth refresh -s project            # once: allow the CLI to manage Projects

cd D:\Projects\VFPScanner-Web
node scripts/github-project/sync-project.mjs --dry-run   # shows what it would do, changes nothing
node scripts/github-project/sync-project.mjs             # creates labels, milestones, issues and the board
```

It prints the board URL at the end. Takes about one to two minutes (around 50 issues).

## Keeping it in sync

When a task is finished, change its status in `docs/github/project-status.json` (`"VW-018": "Done"`), commit, and run the script again. It never creates duplicates: it finds existing issues by their `[ID]` prefix, the project by its title, and items by issue URL, and only updates what changed.

New tickets added to the JSON files appear on the board on the next run.

## If something stops it

| Message | Fix |
|---|---|
| `Not logged in to GitHub` | `gh auth login` |
| `lacks the 'project' scope` | `gh auth refresh -s project` |
| `Project "Status" field has no "In Progress" option` | Add the option in the project's settings → Status field, run again |
| `"Epic" field is missing options` | Add the listed options to the Epic field, run again |
