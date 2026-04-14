# Phase 08 Research: Standalone Research Command Integration

Date: 2026-04-14
Phase: 08-standalone-research-command-integration
Scope: local codebase, local GSD planning artifacts, and upstream GSD compatibility surfaces. No web research was used because this phase is an internal architecture and implementation integration phase.

## Executive Summary

Phase 08 should implement Auto/ARIS research capabilities as a thin GSD-facing command layer, not as a second lifecycle framework. The correct implementation shape is:

1. Public commands use the new `/gsd-ljx-*` prefix for searchability and to avoid name collision with upstream GSD commands.
2. Each command compiles Auto/ARIS prompt intent, preset policy, artifact expectations, and evidence requirements into an ordinary GSD phase or ordinary GSD plan instructions.
3. Canonical lifecycle mutation remains owned by existing GSD helpers such as phase insert, roadmap update, state update, and plan execution.
4. Research-specific artifacts live under phase-local `research/` directories and are indexed by `research/RESEARCH_INDEX.md`.
5. `.planning/research.config.json` is separate from `.planning/config.json`; the compiler reads it, normalizes it, and emits GSD-compatible instructions.
6. Side-effect-capable capabilities such as GPU, W&B, SSH, PR, push, paid compute, and publication are represented as policy, bridge, and evidence requirements in Phase 08. Phase 08 should not actually run those external side effects from `/gsd-ljx-*` commands.

The highest-risk implementation error is turning Auto/ARIS into a parallel state machine. The lowest-risk path is to add small CommonJS helper modules and Markdown command wrappers that reuse existing GSD command/workflow surfaces.

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

- Node.js CommonJS modules under `get-shit-done/bin/lib/*.cjs`.
- Markdown command wrappers under `commands/gsd/*.md`.
- Markdown workflow instructions under `get-shit-done/workflows/*.md`.
- Existing CLI dispatcher in `get-shit-done/bin/gsd-tools.cjs`.
- Existing helper patterns from `tests/helpers.cjs`, `node:test`, and `node:assert/strict`.
- Existing path and prompt safety helpers from `get-shit-done/bin/lib/security.cjs`.
- Existing planning lock and atomic write helpers from `get-shit-done/bin/lib/core.cjs`.
- Existing GSD phase helpers from `get-shit-done/bin/lib/phase.cjs`.

Do not add runtime dependencies for Phase 08. The feature can be implemented with `fs`, `path`, existing helpers, Markdown generation, and tests.

## Architecture Patterns

### Pattern 1: Public Command Wrapper

Every public research command should be a small wrapper in `commands/gsd/gsd-ljx-*.md`.

The wrapper should:

- Declare its research intent and accepted arguments.
- Route to a shared workflow such as `get-shit-done/workflows/gsd-ljx-research-command.md`.
- Name the canonical research command key, for example `idea-discovery` or `experiment-plan`.
- Avoid embedding a separate lifecycle state machine.

The wrapper should not:

- Directly rewrite `.planning/ROADMAP.md`.
- Directly rewrite `.planning/STATE.md`.
- Create `phase_type` or typed phase routing metadata.
- Execute GPU, W&B, SSH, paid compute, push, PR, publication, or destructive operations.

### Pattern 2: Shared Research Compiler

Add a small compiler layer under `get-shit-done/bin/lib/`.

Recommended first modules:

- `research-config.cjs`: read `.planning/research.config.json`, apply defaults, normalize presets, and validate known keys.
- `research-command-map.cjs`: declare supported command families, aliases, required evidence, artifact roots, side-effect policy, and default GSD insertion strategy.
- `research-prompt-packs.cjs`: hold Auto/ARIS prompt fragments as data, not lifecycle behavior.
- `research-compiler.cjs`: merge command intent, user arguments, preset policy, prompt pack, and artifact contract into a GSD-compatible compiled request.
- `research-phase-render.cjs`: render compiled requests into ordinary phase titles, phase goals, plan guidance, and execution instructions.
- `research-index.cjs`: create or update phase-local `research/RESEARCH_INDEX.md` as an artifact index, not lifecycle state.

Recommended second-slice modules:

- `research-evidence.cjs`: check phase-local research artifacts and evidence completeness.
- `research-side-effects.cjs`: classify external side effects into allowed, requires authorization, bridge-only, or blocked states.

Keep the modules plain and deterministic. The command map should be data-first so new command families can be added without scattering conditionals across workflows.

### Pattern 3: CLI Helper Surface

Add a bounded `research` subcommand group to `get-shit-done/bin/gsd-tools.cjs` instead of creating a standalone executable.

Recommended subcommands:

```text
gsd-tools research compile <command> [freeform intent...] [--preset safe|auto|danger-auto] [--phase <id>] [--mode insert|research-first] [--dry-run]
gsd-tools research index <phase-id> [--command <command>]
gsd-tools research evidence-check <phase-id> [--command <command>]
```

The first pass can support only what wrappers need. Avoid designing a broad research runtime.

The `compile` command should return deterministic JSON for tests and optionally Markdown for workflows. It should not mutate canonical GSD state unless the implementation explicitly delegates to existing GSD `phase insert` helpers.

### Pattern 4: GSD-Owned Phase Insertion

Existing-roadmap invocation should insert work after the current phase by default. That insertion must go through GSD phase insertion semantics.

Correct shape:

1. `/gsd-ljx-idea-discovery ...` resolves command key and preset.
2. Compiler renders a concise ordinary GSD phase goal and plan guidance.
3. Workflow invokes or instructs the existing GSD insert phase path.
4. The resulting phase has ordinary GSD numbering, ordinary PLAN files, ordinary execution, ordinary verification.
5. Research artifacts remain phase-local under `research/`.

Research-first pipelines are different: when the whole project is created around research, phases should use normal integer numbering (`1`, `2`, `3`) rather than `.1`, `.2` inserted phase suffixes.

### Pattern 5: One Phase, Plan-Level Decomposition

Default to one inserted phase per research command invocation. Split into multiple phases only when there is a true work-mode boundary, such as discovery versus remote experiment execution versus paper drafting.

Reason:

- Too many inserted phases can break continuity across metrics, methods, experiments, and interpretation.
- GSD already has plan and task layers for fine-grained decomposition.
- The user explicitly prefers mini-roadmap behavior at the phase level, with plan/task granularity inside.

### Pattern 6: Policy Presets

Required presets:

- `safe`: default. Deep research/review, human discussion/checkpoint for hard decisions, no hard-gate bypass.
- `auto`: deep research/review, autonomous ordinary progress, hard gates still block or require explicit authorized bridge handling.
- `danger-auto`: deep research/review, maximum permission intent, hard gates may be represented as auto-approvable in policy. In Phase 08, this still means bridge/policy/evidence only for external side effects; the command layer must not actually run GPU, W&B, SSH, paid compute, push, PR, or publication.

All presets default to deep review and investigation. A shallow mode can exist later, but it is not the default and is not needed for Phase 08.

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
- Config ownership: keep `.planning/config.json` for GSD and `.planning/research.config.json` for research overlay.
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

### Pitfall 2: Polluting `.planning/config.json`

The existing config validator intentionally rejects root `research` config ownership. Phase 08 should not add Auto/ARIS raw config to `.planning/config.json`.

Correct implementation:

```text
.planning/research.config.json
```

The compiler may read both files, but it must treat `.planning/config.json` as upstream GSD-owned.

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

### Example: Command Map Entry

```js
const COMMANDS = {
  'idea-discovery': {
    family: 'discovery',
    publicCommand: 'gsd-ljx-idea-discovery',
    defaultPhaseTitle: 'Research idea discovery',
    defaultMode: 'insert',
    evidence: [
      'literature/LITERATURE_EVIDENCE.md',
      'ideas/IDEA_REPORT.md',
      'novelty/NOVELTY_REVIEW.md'
    ],
    sideEffects: ['network-literature-search'],
    promptPack: 'ideaDiscoveryDeep'
  }
};
```

### Example: Research Config Defaults

```json
{
  "preset": "safe",
  "depth": "deep",
  "reviewRounds": 3,
  "autoReviewLoop": true,
  "checkpoint": "human",
  "literature": {
    "sources": ["local", "web"],
    "deepxiv": false
  },
  "sideEffects": {
    "externalExecution": "bridge-only"
  }
}
```

### Example: Compiler Output Shape

```json
{
  "command": "idea-discovery",
  "publicCommand": "gsd-ljx-idea-discovery",
  "preset": "safe",
  "depth": "deep",
  "mode": "insert",
  "phase": {
    "title": "Research idea discovery",
    "goal": "Use Auto/ARIS idea-discovery prompts inside an ordinary GSD phase while requiring literature and novelty evidence."
  },
  "artifacts": {
    "index": "research/RESEARCH_INDEX.md",
    "required": [
      "research/literature/LITERATURE_EVIDENCE.md",
      "research/ideas/IDEA_REPORT.md",
      "research/novelty/NOVELTY_REVIEW.md"
    ]
  },
  "gates": {
    "humanCheckpoint": true,
    "externalSideEffects": "bridge-only"
  }
}
```

### Example: Side-Effect Policy Result

```json
{
  "requested": ["wandb", "ssh", "gpu", "push"],
  "preset": "danger-auto",
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

### Layer 1: Unit Contract Tests

Focused unit tests should cover:

- research config defaults and preset normalization,
- unknown research config keys and safe warnings,
- command map coverage,
- compiler output shape,
- prompt-pack inclusion,
- artifact contract inclusion,
- side-effect policy classification,
- evidence-check incomplete and complete states.

Suggested files:

- `tests/research-config.test.cjs`
- `tests/research-compiler-discovery.test.cjs`
- `tests/research-compiler-experiment.test.cjs`
- `tests/research-compiler-paper.test.cjs`
- `tests/research-side-effects.test.cjs`

### Layer 2: Wrapper and Workflow Tests

Wrapper tests should cover:

- every `/gsd-ljx-*` command file exists,
- every wrapper routes to the shared research workflow,
- every wrapper declares the intended command key,
- wrapper names do not collide with upstream GSD commands,
- upstream `commands/gsd/research-phase.md` remains unchanged in role.

### Layer 3: Lifecycle Integration Tests

Lifecycle tests should cover:

- existing-roadmap mode compiles to ordinary GSD phase insertion intent,
- research-first mode compiles to integer roadmap planning intent,
- no generated canonical schema includes `phase_type`,
- no compiler path directly rewrites `ROADMAP.md` or `STATE.md`,
- phase-local `research/RESEARCH_INDEX.md` can be initialized without becoming state.

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

- cap: 10 rounds per meaningful implementation slice unless the user changes it,
- early stop: two consecutive clean rounds,
- blocking findings: confirmed P0/P1/P2 findings block progress,
- main agent must second-pass confirm subagent findings before code changes.

## Implementation Feasibility

The plan is feasible because Phase 08 can be implemented as additive surfaces:

- new Markdown command wrappers,
- one shared Markdown workflow,
- new CommonJS helper modules under `get-shit-done/bin/lib/`,
- a bounded `research` command group in `gsd-tools.cjs`,
- focused `node:test` coverage.

No required feature forces a GSD core redesign. The only likely shared-file edits are the `gsd-tools.cjs` dispatcher and perhaps tests. These are controlled, small, and compatible with future upstream sync if isolated to a new research command group.

## Recommended Plan Breakdown

Use four plans:

1. `08-01`: discovery, literature, novelty, review, and refinement command family.
2. `08-02`: experiment planning, bridge policy, result analysis, audit, review loop, and claim command family.
3. `08-03`: paper, rebuttal, ablation, and paper-result command family.
4. `08-04`: parity, lifecycle integration, review loop, security, and final coverage audit.

This keeps Phase 08 small enough to execute with review checkpoints while avoiding too many phases that would fracture research continuity.
