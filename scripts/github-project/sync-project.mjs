#!/usr/bin/env node
/**
 * Creates or updates the GitHub Project board for VFPScanner Web from the plan:
 *   docs/jira-tickets-json/VW-E*.json  (epics + tasks)
 *   docs/github/project-status.json    (status per ticket, owner issues)
 *
 * Runs on the owner's PC with the GitHub CLI (`gh`) and the owner's own login.
 * Safe to run again: existing labels, milestones, issues, project, fields and
 * items are found and updated, never duplicated.
 *
 *   node scripts/github-project/sync-project.mjs            # do it
 *   node scripts/github-project/sync-project.mjs --dry-run  # only print what would happen
 *
 * Needs: gh 2.40+, `gh auth login`, and the project scope: `gh auth refresh -s project`.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DRY = process.argv.includes("--dry-run");
const GH = process.env.GH_BIN || "gh";

const config = JSON.parse(readFileSync(join(ROOT, "docs/github/project-status.json"), "utf8"));
const { owner, repo: repoName, title: projectTitle } = config.project;
const REPO = `${owner}/${repoName}`;
const STATUSES = ["Todo", "In Progress", "Done"];

const tmp = mkdtempSync(join(tmpdir(), "vw-project-"));
let created = 0;
let updated = 0;

// ---------- helpers ----------

function log(msg) {
  console.log(msg);
}

function gh(args, { json = false, allowFail = false } = {}) {
  if (DRY && !isReadOnly(args)) {
    log(`  [dry-run] gh ${args.map(quote).join(" ")}`);
    return json ? {} : "";
  }
  try {
    const out = execFileSync(GH, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 });
    return json ? JSON.parse(out || "{}") : out.trim();
  } catch (err) {
    if (allowFail) return json ? null : null;
    const stderr = err.stderr?.toString().trim() || err.message;
    throw new Error(`gh ${args.slice(0, 3).join(" ")} … failed:\n${stderr}`);
  }
}

function isReadOnly(args) {
  const [a, b] = args;
  if (a === "api") return !args.includes("-X") && !args.includes("--method") && !args.some((x) => /^-[fF]$/.test(x));
  if (a === "auth" || a === "--version") return true;
  return (a === "issue" && (b === "list" || b === "view")) || (a === "project" && /^(list|field-list|item-list|view)$/.test(b));
}

function quote(s) {
  return /[\s"'&|<>]/.test(s) ? JSON.stringify(s) : s;
}

function bodyFile(name, text) {
  const p = join(tmp, `${name.replace(/[^\w-]/g, "_")}.md`);
  writeFileSync(p, text, "utf8");
  return p;
}

function effortOf(description) {
  return description.match(/EFFORT:\s*([^\n]+)/)?.[1]?.trim() ?? "";
}

function statusOf(id) {
  const s = config.status[id] ?? "Todo";
  if (!STATUSES.includes(s)) throw new Error(`docs/github/project-status.json: "${id}" has unknown status "${s}"`);
  return s;
}

// ---------- read the plan ----------

function loadTickets() {
  const dir = join(ROOT, "docs/jira-tickets-json");
  const files = readdirSync(dir).filter((f) => /^VW-E\d+.*\.json$/.test(f)).sort((a, b) => epicNo(a) - epicNo(b));
  const epics = [];
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(dir, file), "utf8"));
    const [epicId] = Object.keys(data);
    const items = data[epicId];
    const epic = items.find((t) => t["Issue Type"] === "Epic");
    if (!epic) throw new Error(`${file}: no Epic entry`);
    const tasks = items.filter((t) => t["Issue Type"] !== "Epic");
    epics.push({ id: epicId, file, epic, tasks, name: config.epicNames[epicId] ?? epic.Summary });
  }
  return epics;
}

function epicNo(f) {
  return Number(f.match(/VW-E(\d+)/)[1]);
}

// ---------- steps ----------

function preflight() {
  log("Checking GitHub CLI…");
  const version = gh(["--version"]);
  log(`  ${version.split("\n")[0]}`);
  // `gh auth status` prints to stderr in some versions and stdout in others: read both.
  const res = spawnSync(GH, ["auth", "status"], { encoding: "utf8" });
  const status = `${res.stdout ?? ""}${res.stderr ?? ""}`;
  if (!/Logged in|Active account: true/i.test(status)) {
    throw new Error("Not logged in to GitHub. Run: gh auth login");
  }
  if (!/project/.test(status)) {
    throw new Error("Your GitHub CLI login lacks the 'project' scope. Run: gh auth refresh -s project");
  }
  gh(["api", `repos/${REPO}`, "--jq", ".full_name"]);
  log(`  Repo ${REPO} reachable.`);
}

function ensureLabels() {
  log("Labels…");
  const labels = [
    ["epic", "5319e7", "VFPScanner Web epic"],
    ["task", "0e8a16", "Task from docs/jira-tickets-json"],
    ["owner-action", "d93f0b", "Needs the owner (decision, account or review)"],
  ];
  for (const [name, color, description] of labels) {
    gh(["label", "create", name, "--repo", REPO, "--color", color, "--description", description, "--force"]);
  }
}

function ensureMilestones(epics) {
  log("Milestones…");
  const existing = gh(["api", `repos/${REPO}/milestones?state=all&per_page=100`], { json: true });
  const byTitle = new Map((Array.isArray(existing) ? existing : []).map((m) => [m.title, m]));
  const titles = new Map();
  for (const e of epics) {
    const title = `${e.id} ${e.name}`;
    titles.set(e.id, title);
    const state = statusOf(e.id) === "Done" ? "closed" : "open";
    const m = byTitle.get(title);
    if (!m) {
      gh(["api", "-X", "POST", `repos/${REPO}/milestones`, "-f", `title=${title}`, "-f", `state=${state}`, "-f", `description=${e.epic.Summary}`]);
      created++;
      log(`  + ${title}`);
    } else if (m.state !== state) {
      gh(["api", "-X", "PATCH", `repos/${REPO}/milestones/${m.number}`, "-f", `state=${state}`]);
      updated++;
    }
  }
  return titles;
}

function existingIssues() {
  const list = gh(["issue", "list", "--repo", REPO, "--state", "all", "--limit", "1000", "--json", "number,title,state,url"], { json: true });
  const map = new Map();
  for (const i of Array.isArray(list) ? list : []) {
    const id = i.title.match(/^\[([A-Z]+-[A-Z0-9-]+)\]/)?.[1];
    if (id) map.set(id, i);
  }
  return map;
}

function ensureIssue(existing, { id, title, body, labels, milestone, status }) {
  const fullTitle = `[${id}] ${title}`;
  let issue = existing.get(id);
  if (!issue) {
    const args = ["issue", "create", "--repo", REPO, "--title", fullTitle, "--body-file", bodyFile(id, body)];
    for (const l of labels) args.push("--label", l);
    if (milestone) args.push("--milestone", milestone);
    const url = gh(args) || `https://github.com/${REPO}/issues/DRY-${id}`;
    const number = Number(url.match(/\/issues\/(\d+)/)?.[1] ?? 0);
    issue = { number, url, title: fullTitle, state: "OPEN" };
    existing.set(id, issue);
    created++;
    log(`  + ${fullTitle}`);
  }
  const wantClosed = status === "Done";
  if (wantClosed && issue.state === "OPEN") {
    gh(["issue", "close", String(issue.number), "--repo", REPO, "--reason", "completed"]);
    issue.state = "CLOSED";
    updated++;
  } else if (!wantClosed && issue.state === "CLOSED") {
    gh(["issue", "reopen", String(issue.number), "--repo", REPO]);
    issue.state = "OPEN";
    updated++;
  }
  return issue;
}

function taskBody(e, t) {
  return `${t.Description}\n\n---\nEpic: **${e.id} ${e.name}** · Source: \`docs/jira-tickets-json/${e.file}\` · Labels: ${t.Labels}`;
}

function epicBody(e) {
  const list = e.tasks.map((t) => `- [${statusOf(t["Issue id"]) === "Done" ? "x" : " "}] ${t["Issue id"]} ${t.Summary}`).join("\n");
  return `${e.epic.Description}\n\n## Tasks\n\n${list}\n\n---\nSource: \`docs/jira-tickets-json/${e.file}\` · Progress: \`docs/PLAN.md\``;
}

function linkSubIssues(epicIssue, taskIssues) {
  if (DRY || !epicIssue.number) return;
  const current = gh(["api", `repos/${REPO}/issues/${epicIssue.number}/sub_issues?per_page=100`], { json: true, allowFail: true });
  const have = new Set((Array.isArray(current) ? current : []).map((s) => s.number));
  for (const t of taskIssues) {
    if (have.has(t.number)) continue;
    const dbId = gh(["api", `repos/${REPO}/issues/${t.number}`, "--jq", ".id"], { allowFail: true });
    if (!dbId) continue;
    // Sub-issues are a newer GitHub feature; if unavailable, milestones still group the tasks.
    gh(["api", "-X", "POST", `repos/${REPO}/issues/${epicIssue.number}/sub_issues`, "-F", `sub_issue_id=${dbId}`], { allowFail: true });
  }
}

function ensureProject() {
  log("Project…");
  const list = gh(["project", "list", "--owner", owner, "--format", "json", "--limit", "100"], { json: true });
  let project = list?.projects?.find((p) => p.title === projectTitle);
  if (!project) {
    project = gh(["project", "create", "--owner", owner, "--title", projectTitle, "--format", "json"], { json: true });
    created++;
    log(`  + project "${projectTitle}"`);
  }
  if (DRY && !project?.number) project = { number: 0, id: "DRY", url: "(dry run)" };
  gh(["project", "link", String(project.number), "--owner", owner, "--repo", REPO], { allowFail: true });
  return project;
}

function ensureFields(project, epics) {
  if (DRY && !project.number) {
    log("  [dry-run] would create fields Epic, Effort, Ticket on the new project");
    return null;
  }
  const epicOptions = epics.map((e) => `${e.id} ${e.name}`).concat("Owner");
  let fields = gh(["project", "field-list", String(project.number), "--owner", owner, "--format", "json", "--limit", "100"], { json: true })?.fields ?? [];
  const find = (name) => fields.find((f) => f.name === name);

  if (!find("Epic")) {
    gh(["project", "field-create", String(project.number), "--owner", owner, "--name", "Epic", "--data-type", "SINGLE_SELECT", "--single-select-options", epicOptions.join(",")]);
    created++;
  }
  if (!find("Effort")) {
    gh(["project", "field-create", String(project.number), "--owner", owner, "--name", "Effort", "--data-type", "TEXT"]);
    created++;
  }
  if (!find("Ticket")) {
    gh(["project", "field-create", String(project.number), "--owner", owner, "--name", "Ticket", "--data-type", "TEXT"]);
    created++;
  }
  fields = gh(["project", "field-list", String(project.number), "--owner", owner, "--format", "json", "--limit", "100"], { json: true })?.fields ?? [];

  const status = fields.find((f) => f.name === "Status");
  const epic = fields.find((f) => f.name === "Epic");
  if (!DRY) {
    if (!status) throw new Error('Project has no "Status" field. Add it in the project settings, then re-run.');
    for (const s of STATUSES) {
      if (!status.options?.some((o) => o.name === s)) {
        throw new Error(`Project "Status" field has no "${s}" option. Add it in the project settings, then re-run.`);
      }
    }
    const missingEpic = epicOptions.filter((o) => !epic?.options?.some((x) => x.name === o));
    if (missingEpic.length) {
      log(`  ! "Epic" field is missing options: ${missingEpic.join(", ")} — add them in the project settings and re-run.`);
    }
  }
  return {
    status,
    epic,
    effort: fields.find((f) => f.name === "Effort"),
    ticket: fields.find((f) => f.name === "Ticket"),
  };
}

function ensureItems(project, fields, rows) {
  log("Board items…");
  if (DRY && !project.number) {
    log(`  [dry-run] would add ${rows.length} items and set Status, Epic, Effort and Ticket`);
    return;
  }
  const list = gh(["project", "item-list", String(project.number), "--owner", owner, "--format", "json", "--limit", "1000"], { json: true });
  const byUrl = new Map((list?.items ?? []).filter((i) => i.content?.url).map((i) => [i.content.url, i]));

  for (const row of rows) {
    let item = byUrl.get(row.issue.url);
    if (!item) {
      item = gh(["project", "item-add", String(project.number), "--owner", owner, "--url", row.issue.url, "--format", "json"], { json: true });
      created++;
    }
    if (DRY || !item?.id) continue;
    const edit = (field, extra) =>
      field && gh(["project", "item-edit", "--id", item.id, "--project-id", project.id, "--field-id", field.id, ...extra]);
    const statusOpt = fields.status.options.find((o) => o.name === row.status);
    if (item.status !== row.status) edit(fields.status, ["--single-select-option-id", statusOpt.id]);
    const epicOpt = fields.epic?.options?.find((o) => o.name === row.epic);
    if (epicOpt && item.epic !== row.epic) edit(fields.epic, ["--single-select-option-id", epicOpt.id]);
    if (row.effort && item.effort !== row.effort) edit(fields.effort, ["--text", row.effort]);
    if (item.ticket !== row.id) edit(fields.ticket, ["--text", row.id]);
  }
}

// ---------- main ----------

function main() {
  log(`${DRY ? "[DRY RUN] " : ""}Syncing GitHub Project "${projectTitle}" for ${REPO}\n`);
  const epics = loadTickets();
  log(`Plan: ${epics.length} epics, ${epics.reduce((n, e) => n + e.tasks.length, 0)} tasks, ${config.ownerIssues.length} owner issues.\n`);

  preflight();
  ensureLabels();
  const milestones = ensureMilestones(epics);

  log("Issues…");
  const existing = existingIssues();
  const rows = [];
  for (const e of epics) {
    const epicName = `${e.id} ${e.name}`;
    const epicIssue = ensureIssue(existing, {
      id: e.id,
      title: e.name,
      body: epicBody(e),
      labels: ["epic"],
      milestone: milestones.get(e.id),
      status: statusOf(e.id),
    });
    rows.push({ id: e.id, issue: epicIssue, status: statusOf(e.id), epic: epicName, effort: effortOf(e.epic.Description) });
    const taskIssues = [];
    for (const t of e.tasks) {
      const id = t["Issue id"];
      const issue = ensureIssue(existing, {
        id,
        title: t.Summary,
        body: taskBody(e, t),
        labels: ["task"],
        milestone: milestones.get(e.id),
        status: statusOf(id),
      });
      taskIssues.push(issue);
      rows.push({ id, issue, status: statusOf(id), epic: epicName, effort: effortOf(t.Description) });
    }
    linkSubIssues(epicIssue, taskIssues);
  }
  for (const o of config.ownerIssues) {
    const issue = ensureIssue(existing, { id: o.id, title: o.title, body: o.body, labels: ["owner-action"], status: o.status });
    rows.push({ id: o.id, issue, status: o.status, epic: "Owner", effort: "" });
  }

  const project = ensureProject();
  const fields = ensureFields(project, epics);
  ensureItems(project, fields, rows);

  log(`\nDone. ${created} created, ${updated} updated. ${rows.length} items on the board.`);
  if (project.url) log(`Board: ${project.url}`);
}

try {
  main();
} catch (err) {
  console.error(`\nStopped: ${err.message}`);
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
