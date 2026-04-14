# GSD Reference Notes For v1.1 Review

**Baseline commit:** `553d9db56eab6ad2ab26e943ff806a8bc92c22cc`
**Source root:** `.planning/references/upstreams/get-shit-done/`

These notes are an implementation baseline for reviewing `ljx-GSD`. They are not polished user docs; they are a checklist for future agents.

## Core Architecture

GSD is a meta-prompting and context-engineering framework. The user-facing command layer is thin; commands route into workflow markdown files, workflows load structured context through `gsd-tools.cjs`, and specialized agents do the heavy work with fresh context windows. Source: `.planning/references/upstreams/get-shit-done/docs/ARCHITECTURE.md`.

Key layers:

- `commands/gsd/*.md` — user entry points. Codex install converts these into `$gsd-*` skills.
- `get-shit-done/workflows/*.md` — orchestration logic. They load context, resolve agents/models, handle gates, write artifacts, and route.
- `agents/*.md` — specialized roles such as roadmapper, planner, executor, verifier, code reviewer, UI checker, security auditor, and codebase mapper.
- `get-shit-done/bin/gsd-tools.cjs` plus internal modules — state/config/phase/roadmap/template/security/workstream helpers.
- `.planning/` project state — `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `config.json`, `phases/`, `research/`, `codebase/`, `quick/`, `threads/`, `debug/`, etc.
- `hooks/` — optional runtime integration for statusline, context monitor, update check, prompt guard, workflow guard, read guard, session state, commit validation, and phase boundary detection.

Parity expectation: `ljx-GSD` should keep the thin-orchestrator + structured-file + specialized-agent pattern. A combined research system can add state families, but should not turn every command into an ad hoc one-off wrapper.

State is file-based but not loose prose. Important invariants from the upstream implementation:

- `.planning/STATE.md` is compact living memory, not an append-only transcript.
- Phase plans and UAT/review/verification artifacts use structured metadata and frontmatter-like sections for deterministic routing.
- Atomic/locked writes matter because parallel executor agents and workstreams can otherwise clobber state.
- Phase numbering supports decimals and must remain parseable.
- Requirement traceability fields connect roadmap phases to requirements and later verifier reasoning.

Parity expectation: `ljx-GSD` can add typed JSON state, but must not break GSD's visible `.planning/` artifact contracts unless migration and mirrors are explicit.

## Lifecycle Semantics

Canonical flow from `docs/ARCHITECTURE.md`:

```text
discuss-phase -> CONTEXT.md
ui-phase -> UI-SPEC.md (optional)
plan-phase -> RESEARCH.md + PLAN.md + plan checker
execute-phase -> code + SUMMARY.md + VERIFICATION.md
verify-work -> UAT.md
ui-review -> UI-REVIEW.md (optional)
```

Important files:

- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/discuss-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/plan-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/verify-work.md`

Discuss-phase is a decision-capture step, not implementation planning. It identifies grey areas the user cares about, avoids scope creep, and writes `CONTEXT.md` for downstream researcher/planner/executor agents.

Plan-phase loads structured context, can use PRD express path, may run research, then planner and plan-checker agents. It has explicit research/plan/verify switches and checks for context availability.

Execute-phase is wave-based. It groups plans by dependencies and delegates to `gsd-executor`, then verifies with `gsd-verifier`. It contains runtime fallbacks for environments where subagent completion is unreliable. It also has worktree/branching, context-window enrichment, and stale auto-chain guard behavior.

Parity expectation: `ljx-GSD` lifecycle commands should not claim phase parity unless they read/write phase artifacts coherently and route through review/verify semantics. Thin helper previews are acceptable only if honestly labelled.

## Progress, Resume, Pause

`progress.md` uses `gsd-tools.cjs init progress`, `roadmap analyze`, `state-snapshot`, summary extraction, UAT debt scanning, and route selection. It must surface the current phase, recent work, blockers, todos, debug sessions, and the next command.

Pause/resume are not just copy text; they preserve state for session continuity and must direct the user/agent back into the correct GSD context.

Parity expectation: `ljx-GSD-progress`, `pause-work`, and `resume-work` must not infer stale phase completion from file counts alone when structured state says otherwise.

## Code Review And Verification

Source: `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/code-review.md`.

GSD code-review semantics:

- Validate phase before config gate.
- Respect `workflow.code_review=false` only after phase validation.
- Resolve depth by CLI `--depth`, then config, then default `standard`.
- Resolve file scope with explicit precedence:
  1. `--files` override.
  2. `SUMMARY.md` frontmatter `key_files`.
  3. Git diff fallback from phase commits.
- Filter planning artifacts and deleted files.
- Spawn `gsd-code-reviewer`.
- Write phase-local review output and route to fix/verify.

Verification/UAT semantics live in `verify-work.md`, `uat.cjs`, and audit workflows. They must treat human-needed, partial, skipped, pending, blocked, and diagnosed gaps as meaningful states rather than just pass/fail.

Parity expectation: `ljx-GSD` review should preserve scoped file selection, freshness/rerun rules, blocking-finding semantics, and verification debt visibility.

Verifier boundary: `gsd-verifier` is goal-backward. It should verify against phase goals and user-visible success criteria, not trust `SUMMARY.md` claims. Review and verification are different gates: code review is a scoped static review, while verifier/UAT decide whether the phase outcome is actually delivered.

Parity expectation: `ljx-GSD` must not treat a green SUMMARY or generated artifact presence as proof of delivery.

## Workstreams And Workspaces

Source: `.planning/references/upstreams/get-shit-done/commands/gsd/workstreams.md`.

Workstreams manage concurrent milestone work with subcommands:

- `list`
- `create <name>`
- `status <name>`
- `switch <name>`
- `progress`
- `complete <name>`
- `resume <name>`

The command delegates to `gsd-tools.cjs workstream ... --raw --cwd "$CWD"` and includes `${GSD_WS}` in routing suggestions. Session-local active workstream handling matters because concurrent sessions should not stomp a shared active pointer.

Workspaces are heavier physical isolation. They should not be conflated with workstreams.

Parity expectation: `ljx-GSD` must preserve the distinction between parallel logical tracks and physical workspace copies/worktrees.

Active workstream resolution order is high-risk parity surface:

1. Explicit `--ws`.
2. `GSD_WORKSTREAM`.
3. Session-scoped active pointer.
4. Legacy pointer fallback.

Workspaces create physical repo isolation, generally under a workspace root such as `~/gsd-workspaces`, using worktrees or clones and separate `.planning/` state.

## Autonomous Mode

Source: `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/autonomous.md`.

Autonomous mode drives all remaining phases or a range via:

- `--from N`
- `--to N`
- `--only N`
- `--interactive`

Default phase loop:

1. Discover incomplete phases from `roadmap analyze`.
2. Smart discuss or skip if context exists.
3. Generate UI contract for frontend phases when needed.
4. Plan.
5. Execute with `--no-transition`.
6. Run code review, auto-fix if findings exist.
7. Read verification status and route.
8. Optionally run UI review.
9. Re-read roadmap after each phase.
10. After all phases, audit -> complete milestone -> cleanup.

Important guard: autonomous discuss in non-interactive mode should be single-pass. Gap closure is bounded to avoid infinite loops.

Parity expectation: `ljx-GSD` autonomous research mode should have the same bounded-loop discipline: never unbounded self-repair, never silent phase mutation without policy, and always explicit verification state.

Execution safety is a separate parity surface:

- `execute-phase` owns wave ordering and dependency gates.
- Worktree execution requires expected-base checks, protected planning files, merge/deletion safeguards, and summary rescue.
- Executors should not mutate ROADMAP/STATE from isolated worktrees in ways that bypass orchestrator ownership.
- Tests that fail or time out should prevent phase completion.

## Project/Milestone Initialization And Migration

`new-project.md` and `new-milestone.md` define requirements/roadmap/state creation. `import.md`, `from-gsd2.md`, and related tests define migration expectations. GSD's README explicitly advises returning users to rebuild planning context with `map-codebase` then `new-project`.

Parity expectation: `ljx-GSD` migration should import or bridge old `.planning/` assets with explicit conflict/repair/reporting instead of assuming greenfield state.

## Codex Installation

GSD README states Claude Code 2.1.88+, Qwen Code, and Codex install as skills (`skills/gsd-*/SKILL.md`); older Claude Code uses commands. Installer architecture says Codex generation is a runtime adaptation from command markdown to skills/TOML config.

Parity expectation: `ljx-GSD` generated Codex skills must be inspected directly. It is not enough for runtime helper code to pass tests if the generated `SKILL.md` content says a different thing.

## Hooks And Safety

Relevant files:

- `.planning/references/upstreams/get-shit-done/hooks/gsd-context-monitor.js`
- `.planning/references/upstreams/get-shit-done/hooks/gsd-prompt-guard.js`
- `.planning/references/upstreams/get-shit-done/hooks/gsd-workflow-guard.js`
- `.planning/references/upstreams/get-shit-done/hooks/gsd-statusline.js`
- `.planning/references/upstreams/get-shit-done/hooks/gsd-check-update.js`

Hooks are advisory/fail-open. They should sanitize session/path inputs and avoid blocking normal development on hook errors.

Parity expectation: `ljx-GSD` should not move authoritative workflow truth into hooks. Hooks may observe, warn, or render, but control state belongs in runtime/state helpers and `.planning/` artifacts.

## Testing Signals

Upstream GSD uses Node 22+, `node --test` via `.planning/references/upstreams/get-shit-done/scripts/run-tests.cjs`, many `.test.cjs` files, CI on Ubuntu/macOS, coverage checks for `get-shit-done/bin/lib/*.cjs`, and security-scan workflows for prompt injection, base64, secrets, and runtime `.planning/` data in PR diffs.

Relevant inspected examples:

- `.planning/references/upstreams/get-shit-done/tests/code-review-command.test.cjs`
- `.planning/references/upstreams/get-shit-done/tests/execute-phase-wave.test.cjs`
- `.planning/references/upstreams/get-shit-done/.github/workflows/test.yml`
- `.planning/references/upstreams/get-shit-done/.github/workflows/security-scan.yml`

Parity expectation: `ljx-GSD` test plans should not only run happy-path helper tests; they need generated-skill, install, state, workflow, edge-case, and security-like regression coverage.

## High-Risk Review Checks For ljx-GSD

- Does every public `ljx-GSD-*` command either implement the accepted semantics or honestly stop as deferred?
- Do generated Codex skills match the helper behavior and manifest truth?
- Are structured state writes centralized enough to avoid drift between docs, state JSON, and markdown mirrors?
- Are code-review freshness/rerun rules preserved after fixes and generated-output changes?
- Does migration handle malformed paths, stale state, and old GSD projects without data loss?
- Do workstream/workspace operations preserve active-pointer and isolation semantics?
- Does autonomous mode have bounded loops and clear stop conditions?
- Do docs/tests/phase artifacts get updated when behavior changes?
- Do locking/atomic updates still protect STATE/ROADMAP/REQUIREMENTS under parallel or workstreamed execution?
- Does verifier use goal-backward evidence rather than trusting executor summaries?
- Do hooks remain fail-open and non-authoritative?
- Does worktree execution prevent protected planning-file and deletion/merge hazards?
