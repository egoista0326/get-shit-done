# v1.3 Two-Stage Review Retrospective And Protocol

**Started:** 2026-04-12
**Trigger:** After v1.2 reached the 6-round cap with clean streak 0, the user requested a deeper two-stage review: first detailed static/implementation review, then live task-scenario review through installed `ljx-GSD` skills only.
**Base inputs:** `.planning/review/v1.2/BUG-LEDGER.md`, `.planning/review/v1.2/REVIEW-STATE.md`, upstream GSD/Auto reference notes, generated preview install, and current tests.

## Progress Snapshot From `$gsd-progress`

- `gsd-tools progress bar --raw`: `[████████████████████] 59/59 plans (100%)`
- State status: `round_06_capped_not_clean`
- Last v1.2 activity: Round 6 fixed V12-053 through V12-063; targeted regression suites, preview install, generated self-containment scans, docs-contract, full 694-test suite, and diff check passed.
- Interpretation: implementation plans are complete, but the review milestone is not formally successful because v1.2 did not achieve two consecutive clean review rounds before its cap.

## What v1.2 Fixed

v1.2 fixed 63 confirmed issues:

- P1: 28
- P2: 30
- P3/minor: 5

Main bug families:

- Runtime and path safety: unsafe `.planning` discovery, state-family reads/writes, dangling symlinks, symlinked parent directories, exact symlink artifacts, non-atomic writes, temp-path symlink writes, and partial rollback failures.
- Lifecycle and quality gates: stale review/verification freshness, terminal/pending review-loop states, blocked verification status, code-review-fix rerun state, phase-id git fallback drift, and direct execution evidence classification.
- Self-contained skill routing: generated `ljx-GSD-*` prompts, direct builders, recommendation/handoff slots, slash commands, dollar calls, local suffix names, and caller override maps could route back to raw GSD/Auto skills.
- Prompt-fidelity preservation: `research-pipeline`, `experiment-bridge`, `review-loop`, `result-to-claim`, `pause-work`, and `workstreams` initially preserved control flow while losing Auto/GSD quality requirements.
- Codex adapter conformance: Claude JSON hook/MCP blocks, Claude CLI/doc references, MiniMax and llm-chat schema drift, Codex hook template feature flags, and meta-opt `spawn_agent` / `send_input` logging.
- Migration/admin/workstream parity: legacy migration provenance, suggested-branch records, roadmap add/remove root safety, workstream create activation, pause/resume recovery, and docs/state accounting.
- Paper/rebuttal evidence: symlinked artifacts, unsafe rebuttal workspaces, unsafe review sources, and stale test callsites after safety-oriented helper signature changes.

## Why New Issues Kept Appearing

The repeated discoveries were not random; they came from review-scope expansion across different bug families.

- The first scan found raw self-contained violations, then later rounds found new syntactic variants: slash aliases, bare imperative references, backticked names, recommendation slots, raw `$...`, local suffixes, and caller override maps. A pattern-based scanner only covers the pattern families it knows.
- Prompt-fidelity and self-containment pulled in opposite directions. Removing raw Auto/GSD calls was necessary, but each removal had to be checked against upstream prompt quality; otherwise the resulting `ljx-GSD` prompt could run but perform worse.
- Path safety had a layered model. Fixing exact symlinks did not automatically fix symlinked parents, dangling symlinks, temp paths, state-family roots, workspace roots, or generated install roots.
- Lifecycle correctness depends on state interactions, not one file. A clean code-review artifact, verify-work state, phase record, execution summary, and git fallback can disagree; each pair needed explicit tests.
- Codex conversion touched copied upstream docs, generated active skills, support scripts, templates, and converter tools. A fix in one surface could leave stale Claude semantics in another.
- Documentation/accounting was not mechanically tied to fixes. Several rounds updated code and tests before updating requirements, task-plan, review-state, and progress mirrors.
- The review was largely implementation-probe driven. It improved each round, but it did not start from a complete bug-family matrix plus live scenario execution transcript requirements.

## Why One Round Could Not Find Everything

One round can be exhaustive only relative to an explicit state space. v1.2 did not initially enumerate the full state space:

- Raw skill invocation has many syntactic forms and generation entrypoints.
- Upstream capability preservation requires reading the actual upstream prompt intent, not just checking that the ljx command route exists.
- Runtime safety needs Cartesian coverage across exact path, ancestor path, dangling path, file-vs-directory path, write path, rollback path, read path, and generated install path.
- The `ljx-GSD` surface is both generated prompts and runtime helpers; generated output can be correct while direct exported builders or preview helpers are wrong.
- Some issues only appear after a fix changes an API or a prompt route, as with the final paper-evidence test callsite migration.
- Full workflow quality cannot be fully inferred from unit tests; it needs actual scenario runs where an agent reports the skill chain and artifacts it used.

The v1.3 protocol therefore treats review as a matrix exercise plus live scenario exercise, not a sequence of ad hoc searches.

## v1.3 Review Rules

### Global Rules

- Success requires two consecutive clean rounds in the active stage.
- P0/P1/P2 findings reset the current stage clean streak to 0 after fixes.
- P3/minor findings may be fixed while still counting the round as clean only when they are extreme, rare, or non-normal-use-impacting.
- `.planning` review/accounting document updates do not reset clean count by themselves. They count as P3/minor bookkeeping unless they directly misroute a skill, corrupt generated install output, break state recovery, hide a blocking implementation defect, or make the verification baseline unreliable.
- Every accepted issue must have second-pass confirmation against one of:
  - upstream GSD behavior,
  - upstream Auto/ARIS behavior,
  - accepted `ljx-GSD` design docs,
  - generated preview install contract,
  - direct runtime safety/consistency reasoning.
- Every fix must include a regression test or a documented non-automatable scenario transcript.
- Every fix must run the cross-pressure pair relevant to its family:
  - self-contained route fix -> prompt-fidelity check,
  - prompt-fidelity fix -> self-contained scan,
  - path-safety fix -> normal happy-path regression,
  - docs/accounting fix -> docs-contract,
  - Codex adapter fix -> generated preview install plus installed support asset inspection,
  - lifecycle gate fix -> stale/fresh/blocked/terminal state regression.
- No “narrow slice” clean rounds: each round must explicitly touch every matrix category unless the stage-specific protocol says otherwise.
- No infinite review: Stage 1 cap is 5 rounds; Stage 2 cap is 4 rounds.
- If a stage hits its cap without two clean rounds, stop that stage as capped_not_clean and report. Do not silently proceed to the next stage.

### Stage 1: Static And Implementation Review

Cap: 5 rounds.
Exit to Stage 2: two consecutive clean Stage 1 rounds.

Each Stage 1 round must cover:

- Generated skill self-containment: no raw GSD/Auto `$...`, slash commands, backticked raw names, recommendation-slot names, or caller override escapes in generated `ljx-GSD-*` skills.
- Prompt-fidelity preservation: compare high-risk `ljx-GSD` prompts against upstream GSD/Auto intent for engineer lifecycle, research pipeline, experiment bridge, review loop, result-to-claim, paper/rebuttal, pause/resume, workstreams, and roadmap admin.
- Codex conformance: no active Claude Code CLI/config/hook/docs semantics in Codex output; generated support assets use Codex-compatible paths, hooks, env, and tool payloads.
- Runtime state/path safety: exact path, ancestor symlink, dangling symlink, directory-as-file, state-family root, temp write, rollback, and regular happy-path behavior.
- Lifecycle quality gates: code-review, code-review-fix, verify-work, execution evidence, phase selection, git fallback, terminal/pending/blocked states.
- Migration/admin/workstreams/workspaces: import/release safety, roadmap mutation, workstream create/switch/complete, workspace isolation expectations, version-management semantics.
- Paper/rebuttal and research evidence: paper artifact links, rebuttal workspace, review source discovery, claim/evidence readiness, result analysis routing.
- Docs/accounting: requirements, project, state, roadmap, task_plan/progress, review-state, bug ledger, scenario matrix. These are reviewed for continuity and traceability, but they only fail the round if they affect skill behavior, install/runtime routing, or verification reliability.

Subagent requirements:

- Use multiple subagents with narrow but overlapping charters.
- Each subagent must name the files/functions it inspected and provide a `candidate -> confirmation evidence -> severity -> fix recommendation` table.
- The main agent must not accept a candidate until it performs or assigns second-pass confirmation.

### Stage 2: Live Scenario Skill-Use Review

Cap: 4 rounds.
Exit: two consecutive clean Stage 2 rounds.

Strict rule: scenario subagents must use only `ljx-GSD-*` skills. They must not use raw GSD or Auto skills as their workflow mechanism.

Each Stage 2 round must run isolated temporary scenarios and clean them afterward. The main agent simulates the user by sending prompts to subagents and requiring each subagent to report:

- scenario workspace path,
- exact installed `ljx-GSD` skill names used,
- ordered skill execution chain,
- artifacts created or read,
- stopped/blocked/confirmation points,
- whether any raw GSD/Auto skill was used,
- whether generated hooks or support assets were expected and observed,
- where behavior diverged from upstream GSD/Auto or accepted `ljx-GSD` design.

Required scenario families across Stage 2:

- Complete engineering line: new project -> discuss -> plan -> execute -> code-review -> code-review-fix if needed -> verify -> next/progress.
- Complete research line: idea discovery -> research refine -> experiment plan -> experiment bridge -> review loop -> result-to-claim -> claim-gate -> paper pipeline.
- Pause/resume: pause mid-phase, resume from handoff, preserve structured state and workstream context.
- Workstream and workspace: create/switch/complete secondary workstreams; verify primary/mainline isolation; where workspace support is not bridge-ready, ensure the skill stops honestly and routes correctly.
- Version/migration management: migrate GSD/Auto-like project artifacts into `ljx-GSD`, inspect release blockers, verify no raw control-plane takeover.
- Literature/idea/result analysis: check that literature reading, novelty, research-review, result-to-claim, and ablation-planner routes preserve Auto research quality without raw Auto calls.
- Experiment execution: dry-run or non-GPU simulation only unless explicit compute approval exists; verify launch confirmation, logging, tracker, result collection, and audit routing semantics.
- Paper/rebuttal/code review: paper artifact readiness, rebuttal workspace, code-review loop, and verify-work quality gates.

Scenario cleanup:

- Use `.tmp/ljx-gsd-v1.3-scenarios/` or OS temp directories.
- Record only scenario summaries under `.planning/review/v1.3/`.
- Remove temporary scenario workspaces after each round unless a failing case must be preserved; preserved failures must be listed explicitly.

## Round Template

Each round writes:

- `ROUND-XX-CANDIDATES.md`
- `ROUND-XX-REVIEW.md`
- bug ledger rows for confirmed issues
- verification evidence and cleanup evidence

Round verdict values:

- `clean`
- `minor_clean`
- `fixed_not_clean`
- `blocked`
- `capped_not_clean`
