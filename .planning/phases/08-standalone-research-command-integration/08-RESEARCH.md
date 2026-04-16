# Phase 08 Research: Standalone Research Command Integration

Date: 2026-04-14
Updated: 2026-04-15 after Phase 08.1 thin overlay rewrite
Phase: 08-standalone-research-command-integration
Scope: local codebase, local GSD planning artifacts, and upstream GSD compatibility surfaces. No web research was used because this phase is an internal architecture and implementation integration phase.

## Executive Summary

Supersession note: the original research below evaluated a small helper/config/compiler route. That route is now abandoned. Phase 08.1 replaced it with ultra-thin installable Markdown command sources under `commands/gsd/ljx-*.md`, and 08-02/08-03 were reconciled onto that baseline.

Current implementation shape:

1. Source files use `commands/gsd/ljx-*.md` with frontmatter `name: gsd:ljx-*`; installation converts them to standard `gsd-ljx-*` skills or commands.
2. Each file is self-contained Markdown guidance: how to construct ordinary GSD phases/plans, what research artifacts to write, which quality dimensions matter, and what not to do.
3. Canonical lifecycle mutation remains owned by existing GSD commands such as phase insertion, planning, execution, review, docs update, verification, and state update.
4. Research-specific artifacts remain phase-local under `.planning/phases/<phase>/research/`.
5. `.planning/research.config.json`, `research-*.cjs`, a research CLI dispatcher, and a shared `gsd-ljx-research-command.md` workflow are deliberately absent.
6. Side-effect-capable capabilities such as GPU, W&B, SSH, PR, push, paid compute, publication, submission, and external uploads are represented as authorization-gated instructions only.

The highest-risk implementation error remains turning Auto/ARIS into a parallel state machine. The current lowest-risk path is to keep the overlay as Markdown skills plus focused tests and final review evidence.

## Primary Local Sources

- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/phases/08-standalone-research-command-integration/08-CONTEXT.md`
- `.planning/phases/08-standalone-research-command-integration/08-DISCUSSION-LOG.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-FEASIBILITY.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`
- `commands/gsd/research-phase.md`
- `commands/gsd/insert-phase.md`
- `get-shit-done/workflows/research-phase.md`
- `get-shit-done/workflows/insert-phase.md`
- `get-shit-done/bin/gsd-tools.cjs`
- `get-shit-done/bin/lib/core.cjs`
- `get-shit-done/bin/lib/phase.cjs`
- `get-shit-done/bin/lib/state.cjs`
- `get-shit-done/bin/lib/config.cjs`
- `get-shit-done/bin/lib/security.cjs`
- `tests/foundation-boundaries.test.cjs`
- `tests/core-lifecycle-planning-parity.test.cjs`
- `tests/core-review-workspace-git-parity.test.cjs`
- `tests/core-gsd-parity-scenario.test.cjs`
- `tests/helpers.cjs`

## Standard Stack

Use the existing repository stack only:

- Markdown command sources under `commands/gsd/ljx-*.md`.
- Existing installer conversion from `commands/gsd/ljx-*.md` source files to installed `gsd-ljx-*` command/skill names.
- Existing GSD lifecycle commands and workflows such as `/gsd-add-phase`, `/gsd-insert-phase`, `/gsd-discuss-phase`, `/gsd-plan-phase`, `/gsd-execute-phase`, `/gsd-code-review`, `/gsd-docs-update`, `/gsd-verify-work`, and `/gsd-validate-phase`.
- Existing test stack from `node:test` and `node:assert/strict`.
- Existing parity/foundation tests that verify no core lifecycle drift.

Do not add runtime dependencies for Phase 08. Do not add research helper modules, CLI subcommands, a shared research workflow, custom install relocation, or a research config file.

## Architecture Patterns

### Pattern 1: Public Markdown Command Source

Every public research command should be a self-contained Markdown source in `commands/gsd/ljx-*.md`.

The command source should:

- Use frontmatter `name: gsd:ljx-*`.
- Declare its objective and accepted arguments.
- Include `<gsd_phase_construction>` instructions that route work through ordinary GSD phases, plans, reviews, docs, validation, and verification.
- Include research instructions, required phase-local outputs, quality dimensions, and non-goals.
- Use installed `/gsd-ljx-*` invocation names when handing off to another overlay command.
- Avoid embedding a separate lifecycle state machine.

The command source should not:

- Directly rewrite `.planning/ROADMAP.md` or `.planning/STATE.md`.
- Create `phase_type` or typed phase routing metadata.
- Route through a shared `gsd-ljx-research-command.md` workflow.
- Depend on `research-*.cjs` helper modules or `gsd-tools research` subcommands.
- Execute GPU, W&B, SSH, paid compute, push, PR, publication, submission, upload, or destructive external operations.

### Pattern 2: No Research Runtime

Do not add a shared research compiler, command map, prompt-pack runtime, evidence parser, side-effect classifier, or research config loader.

Preserve Auto/ARIS value as written obligations:

- novelty definitions and 0-10 scoring,
- closest-prior-work comparison,
- review caps and clean-round accounting,
- experiment/audit/result/claim artifact expectations,
- claim support and gate categories,
- paper/rebuttal provenance and coverage rules,
- explicit authorization boundaries.

### Pattern 3: Existing GSD Helper Surface

When a research command needs project lifecycle work, it should instruct use of existing GSD commands:

```text
/gsd-add-phase
/gsd-insert-phase
/gsd-discuss-phase
/gsd-plan-phase
/gsd-execute-phase
/gsd-code-review
/gsd-docs-update
/gsd-verify-work
/gsd-validate-phase
```

No Phase 08 command should introduce a new lifecycle helper or research dispatcher.

### Pattern 4: GSD-Owned Phase Construction

Existing-roadmap invocation should use ordinary GSD phase construction. Current correct shape:

1. A `/gsd-ljx-*` command explains what phase, plan, or artifact work is needed.
2. The agent uses ordinary GSD phase or plan commands to create/update lifecycle artifacts.
3. The resulting phase has ordinary GSD numbering, ordinary PLAN files, ordinary execution, ordinary verification.
4. Research artifacts remain phase-local under `research/`.

Research-first pipelines are different: when the whole project is created around research, phases should use normal integer numbering (`1`, `2`, `3`) rather than `.1`, `.2` inserted phase suffixes.

### Pattern 5: One Phase, Plan-Level Decomposition

Default to one inserted phase per research command invocation. Split into multiple phases only when there is a true work-mode boundary, such as discovery versus remote experiment execution versus paper drafting.

Reason:

- Too many inserted phases can break continuity across metrics, methods, experiments, and interpretation.
- GSD already has plan and task layers for fine-grained decomposition.
- The user explicitly prefers mini-roadmap behavior at the phase level, with plan/task granularity inside.

### Pattern 6: Policy Concepts Without Config

These concepts are preserved as Markdown instructions, not as `.planning/research.config.json`:

- Default to deep research/review.
- Use human checkpoints for hard decisions when GSD or the user requires them.
- Treat maximum-authority or auto-proceed language as policy intent only; it never grants external execution by itself.
- Side-effect-capable commands require explicit authorization and evidence.

A shallow mode can exist later, but it is not the default and is not needed for Phase 08.

### Pattern 7: Artifact Contracts

Research artifacts should be phase-local. Recommended roots:

```text
.planning/phases/<phase-slug>/research/RESEARCH_INDEX.md
.planning/phases/<phase-slug>/research/literature/LITERATURE_EVIDENCE.md
.planning/phases/<phase-slug>/research/ideas/IDEA_REPORT.md
.planning/phases/<phase-slug>/research/novelty/NOVELTY_REVIEW.md
.planning/phases/<phase-slug>/research/refine/REFINE_STATE.json
.planning/phases/<phase-slug>/research/experiments/EXPERIMENT_PLAN.md
.planning/phases/<phase-slug>/research/experiments/EXPERIMENT_TRACKER.md
.planning/phases/<phase-slug>/research/experiments/EXPERIMENT_AUDIT.md
.planning/phases/<phase-slug>/research/results/CLAIMS_FROM_RESULTS.md
.planning/phases/<phase-slug>/research/paper/PAPER_PLAN.md
.planning/phases/<phase-slug>/research/rebuttal/REBUTTAL_PLAN.md
.planning/phases/<phase-slug>/research/ablation/ABLATION_PLAN.md
```

`RESEARCH_INDEX.md` is an index and evidence manifest. It is not a replacement for `STATE.md`, `ROADMAP.md`, or PLAN files.

## Don't Hand-Roll

Do not hand-roll these things:

- Phase numbering: reuse GSD phase insertion and roadmap helpers.
- Canonical state: reuse GSD state helpers.
- Project root discovery: reuse existing `--cwd`, `planningDir`, `planningPaths`, and workstream-aware helpers.
- Path validation: reuse `validatePath`, `requireSafePath`, and phase-root containment checks.
- Prompt sanitization: reuse `sanitizeForPrompt` and injection scanning where user text is embedded into generated prompts.
- Config ownership: keep `.planning/config.json` for GSD and do not add a Phase 08 research config file.
- Side-effect execution: classify and render policy/bridge instructions; do not implement actual GPU/W&B/SSH/paid/push/PR/publish execution in Phase 08.
- Review process: reuse the agreed multi-dimensional review loop rather than relying on one self-review.

## Common Pitfalls

### Pitfall 1: Creating a Second Roadmap or State Machine

Bad implementation:

```text
.planning/research-roadmap.json
.planning/research-state.json
phase_type: research
```

Correct implementation:

```text
GSD ROADMAP.md + GSD STATE.md + ordinary phase directories + phase-local research artifacts
```

### Pitfall 2: Reintroducing Research Config

The existing config validator intentionally rejects root `research` config ownership. Phase 08 should not add Auto/ARIS raw config to `.planning/config.json`, and the thin overlay rewrite also should not restore a separate `.planning/research.config.json`.

Correct implementation:

```text
Markdown command instructions + ordinary GSD plans + phase-local research artifacts
```

Preset-like concepts are written into command guidance and plan decisions. There is no Phase 08 research config reader.

### Pitfall 3: Marking Idea Discovery Clean Without Literature Evidence

`idea-discovery` cannot be clean if it only produces speculative ideas without retrieval, reading notes, and novelty evidence.

Minimum evidence should include:

- query/source configuration,
- source IDs, URLs, paths, or retrieval timestamps,
- accepted and rejected papers,
- reading notes,
- novelty comparison,
- idea candidate rationale.

### Pitfall 4: Over-Splitting Experiments

Experiment plan, metrics, method details, audit, and result-to-claim often need to reference each other tightly. Default to one phase with multiple plans/tasks unless a real boundary exists.

### Pitfall 5: Treating Danger-Auto as Actual External Execution

`danger-auto` means maximum permission intent and hard-gate auto-approval semantics in the policy layer. In Phase 08 it does not mean the new command wrappers should actually SSH, run paid compute, push, create PRs, publish, or mutate external services.

The correct output is bridge-ready instructions and evidence requirements that later execution can use under GSD governance.

### Pitfall 6: Bypassing Review

The user has explicitly required frequent review during Phase 08 implementation. Each meaningful implementation slice must run multiple review lanes and loop until two consecutive clean rounds or the cap is reached. Main agent must confirm returned findings before modifying code.

## Code Examples

### Example: Thin Command Source

```markdown
---
name: gsd:ljx-idea-discovery
description: Generate research ideas from literature notes, novelty evidence, and user intent.
argument-hint: "[topic or seed idea]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
---

<objective>
Use ordinary GSD phase context to produce phase-local idea artifacts.
</objective>

<gsd_phase_construction>
- Create or select an ordinary GSD phase with `/gsd-add-phase`, `/gsd-insert-phase`, or `/gsd-discuss-phase`.
- Store outputs under `.planning/phases/<phase>/research/ideas/`.
- Route substantial follow-up work through `/gsd-plan-phase <phase>`.
</gsd_phase_construction>

<required_outputs>
- `research/ideas/IDEA_REPORT.md`
- `research/novelty/NOVELTY_REVIEW.md`
</required_outputs>
```

### Example: Phase-Local Artifact Contract

```text
.planning/phases/<phase>/research/
  literature/LITERATURE_EVIDENCE.md
  ideas/IDEA_REPORT.md
  novelty/NOVELTY_REVIEW.md
  experiments/EXPERIMENT_PLAN.md
  claims/RESULT_TO_CLAIM.md
  claims/CLAIM_GATE.md
  paper/PAPER_PLAN.md
```

The artifact contract is written in the command Markdown itself. It is not generated by a command map, config loader, prompt-pack registry, compiler output, or runtime helper.

### Example: Claim Gate Handoff

```text
1. `/gsd-ljx-analyze-results` records metrics and caveats.
2. `/gsd-ljx-experiment-audit` records evidence integrity.
3. `/gsd-ljx-result-to-claim` classifies support as yes, partial, no, or unsupported.
4. `/gsd-ljx-claim-gate` decides GO, NARROW, MORE_EVIDENCE, or NO_CLAIM.
5. Paper, rebuttal, release, or public-summary work may only use the gated claim.
```

### Example: Side-Effect Boundary Note

```json
{
  "requested": ["wandb", "ssh", "gpu", "push"],
  "phase08Behavior": "bridge-only",
  "actualExecutionAllowedByThisCommand": false,
  "requiredEvidence": [
    "authorization record",
    "credential boundary",
    "cost boundary",
    "rollback or cleanup plan"
  ]
}
```

## Validation Architecture

Phase 08 needs validation at four layers.

### Layer 1: Thin Overlay Contract Tests

Focused tests should cover:

- 25 `commands/gsd/ljx-*.md` source files exist,
- each source uses `name: gsd:ljx-*`,
- old `commands/gsd/gsd-ljx-*.md` source wrappers are absent,
- old `get-shit-done/bin/lib/research-*.cjs` runtime files are absent,
- `.planning/research.config.json` and shared research workflow are absent,
- command docs preserve required research semantics,
- side-effect-capable command docs require explicit authorization.

Suggested files:

- `tests/research-thin-overlay.test.cjs`
- `tests/bug-1736-local-install-commands.test.cjs`
- `tests/core-lifecycle-planning-parity.test.cjs`
- `tests/core-gsd-parity-scenario.test.cjs`
- `tests/foundation-boundaries.test.cjs`

### Layer 2: Installer and Command Surface Tests

Installer and command surface tests should cover:

- every `/gsd-ljx-*` command file exists,
- `ljx-*.md` local command sources are not already prefixed,
- global skill conversion produces `gsd-ljx-*` names without double prefixing,
- command bodies use installed `/gsd-ljx-*` handoffs rather than bare names,
- source names do not collide with upstream GSD commands,
- upstream `commands/gsd/research-phase.md` remains unchanged in role.

### Layer 3: Lifecycle Integration Tests

Lifecycle tests should cover:

- research commands point users to ordinary GSD phase and plan construction,
- no generated canonical schema includes `phase_type`,
- no research runtime path directly rewrites `ROADMAP.md` or `STATE.md`,
- phase-local research artifacts do not become lifecycle state.

### Layer 4: Review and Parity Gates

Every implementation slice should create or update a plan-local review artifact, for example:

```text
.planning/phases/08-standalone-research-command-integration/08-01-REVIEW.md
.planning/phases/08-standalone-research-command-integration/08-02-REVIEW.md
.planning/phases/08-standalone-research-command-integration/08-03-REVIEW.md
.planning/phases/08-standalone-research-command-integration/08-04-REVIEW.md
```

Review lanes:

- GSD lifecycle boundary and no-core-change lane,
- research semantic preservation lane,
- security and side-effect policy lane,
- tests and maintainability lane.

Loop rule:

- cap: 30 rounds for the final Phase 08 review unless the user changes it,
- early stop: two consecutive clean rounds,
- blocking findings: confirmed P0/P1/P2 findings block progress,
- main agent must second-pass confirm subagent findings before code changes.

## Implementation Feasibility

The plan is feasible because Phase 08 can be implemented as additive Markdown surfaces:

- self-contained Markdown command sources,
- existing installer conversion,
- existing GSD lifecycle commands,
- focused `node:test` coverage.

No required feature forces a GSD core redesign. The intended production changes are command docs and tests only.

## Recommended Plan Breakdown

Use four plans:

1. `08-01`: discovery, literature, novelty, review, and refinement command family.
2. `08-02`: experiment planning, bridge policy, result analysis, audit, review loop, and claim command family.
3. `08-03`: paper, rebuttal, ablation, and paper-result command family.
4. `08-04`: parity, lifecycle integration, review loop, security, and final coverage audit.

This keeps Phase 08 small enough to execute with review checkpoints while avoiding too many phases that would fracture research continuity.
