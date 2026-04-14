# Phase 07 Research: Authoritative Runtime Substrate

**Date:** 2026-04-10  
**Status:** Research complete  
**Phase:** 07-implement-authoritative-runtime-substrate  
**Requirement focus:** `IMPL-01`

## User Constraints

The implementation approach for Phase 07 must preserve these project-level constraints:

1. Study and reuse the current GSD implementation and the current Auto research implementation before inventing new substrate behavior.
2. Follow a minimal-modification principle: do not delete or intentionally narrow original GSD or Auto capabilities as a shortcut.
3. Reuse GSD as the outer runtime base where practical, and integrate Auto research as a native workflow family without deleting Auto's existing workflow strengths or skill semantics.

These constraints are already reflected in:

- `.planning/PROJECT.md`
- `LJX-GSD-DESIGN-DECISION-LOG.md`
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-CONTEXT.md`

## Summary

Phase 07 should not try to finish the lifecycle shell. It should build the runtime layer that later phases can trust:

- one shared resolver stack for planning root, config, phase, and workstream identity
- one authoritative structured-state IO layer for the first three core families:
  - `phase-records`
  - `sessions`
  - `workstreams`
- one migration path for current bridge helpers so they stop duplicating planning-dir discovery, markdown parsing, and ad hoc resolver logic

The strongest reference pattern is current GSD's separation between:

- CLI routing and workflow orchestration
- centralized shared runtime helpers in `bin/lib`
- workflow prompts that consume structured results instead of re-parsing the repository

The strongest Auto-side pattern to preserve is its workflow semantics:

- explicit multi-stage pipelines
- durable intermediate artifacts
- resumable JSON state files for long-running loops
- convenience entrypoints that remain public, but should converge onto one shared runtime truth

The practical recommendation is:

1. Build a new shared runtime core module under `bin/lib/`.
2. Build a structured-state module for the first authoritative families.
3. Move bridge helpers onto that substrate without changing their accepted artifact contracts.

## Standard Stack

### Language and module style

- Use the existing Node CommonJS style already used across `bin/lib/*.cjs`.
- Keep the substrate in reusable library modules, not in command-specific prompt logic.

### Authoritative storage

- Global workflow policy remains in `.planning/config.json`.
- Phase overrides remain in `.planning/state/phase-records/{phase_id}.json`.
- Runtime structured state for this phase lands only in:
  - `.planning/state/phase-records/`
  - `.planning/state/sessions/`
  - `.planning/state/workstreams/`

### Operator-facing mirrors

- `STATE.md`, `ROADMAP.md`, and phase-local markdown artifacts remain human-readable mirrors or deliverables.
- They are fallback read surfaces during transition, not the long-term machine-truth layer.

## Reference Implementations To Reuse

### GSD references

#### `~/.codex/get-shit-done/bin/gsd-tools.cjs`

Use as the reference for:

- one CLI entrypoint
- shared runtime modules under `bin/lib`
- keeping workflow prompts thin

#### `~/.codex/get-shit-done/bin/lib/core.cjs`

Use as the reference for:

- centralized path and planning-root helpers
- config loading
- phase lookup
- session-scoped workstream pointer handling

Do not copy its markdown-first truth model. Reuse the organization pattern, not the storage semantics.

#### `~/.codex/get-shit-done/bin/lib/init.cjs`

Use as the reference for:

- workflow bootstrapping through one structured init payload
- keeping workflows dependent on computed context rather than re-parsing files ad hoc

This is especially relevant for later Phase 08 work, so Phase 07 should shape the substrate around a future `init`-style API.

### Current ljx-GSD bridge references

#### `bin/lib/ljx-bridge-contract.cjs`

Already contains useful shared logic for:

- phase sorting
- phase-type inference
- summary key-file extraction
- review requirement defaults

This should stay as a domain helper, but it should stop owning low-level resolution logic that belongs in the new substrate.

#### `bin/lib/ljx-state-tools.cjs`

Already contains useful bridge behavior for:

- runtime-shell recommendation logic
- malformed-config honest stop behavior
- state parsing helpers

This should become a consumer of the new runtime substrate instead of remaining the place where planning-root discovery and markdown fallback logic are improvised.

#### `bin/lib/ljx-new-project-tools.cjs`

This is the current seed writer for:

- `.planning/config.json`
- `.planning/state/phase-records/{phase}.json`

It should become the first canonical writer for the new structured families, especially `workstreams/primary.json`.

#### `bin/lib/ljx-workstreams-tools.cjs`

This is currently the clearest example of duplicated resolver logic and pointer-era semantics. It should be one of the first consumers of:

- canonical active-workstream resolution
- structured workstream reads
- honest fallback behavior for stale legacy pointers

### Auto research references

#### `~/.codex/skills/idea-discovery/SKILL.md`

Preserve these semantics:

- explicit multi-stage pipeline
- phase-local deliverables such as `IDEA_REPORT.md`
- optional compact artifacts
- explicit downstream handoff suggestions

#### `~/.codex/skills/research-refine/SKILL.md`

Preserve these semantics:

- resumable long-running state
- explicit anchored artifacts such as `FINAL_PROPOSAL.md` and `REFINEMENT_REPORT.md`
- round-based recovery state

The future structured state should absorb recovery truth without deleting the current artifact vocabulary.

#### `~/.codex/skills/auto-review-loop/SKILL.md`

Preserve these semantics:

- persistent review-loop state
- resumed rounds
- cumulative review artifacts
- autonomous continuation that still documents each round

This is direct evidence that later research runtime families should not be invented from scratch when Auto already has stable workflow semantics worth preserving.

#### `~/.codex/skills/research-pipeline/SKILL.md` and `~/.codex/skills/paper-writing/SKILL.md`

Preserve these semantics:

- convenience umbrella entrypoints remain public
- workflow chaining remains explicit
- user-facing gates stay visible

But Phase 07 should not implement those umbrella flows yet. It should only make sure the substrate later supports them without becoming a second control plane.

## Architecture Patterns

### Pattern 1: Structured-state-first reader with honest fallback

Recommended precedence:

1. authoritative structured state under `.planning/state/...`
2. legacy summary or pointer inputs such as `STATE.md` or `active-workstream`
3. honest stop if neither source is trustworthy

Conflict rule:

- if authoritative structured state exists and conflicts with legacy fallback sources, return a warning/stop state instead of silently repairing or choosing a winner

This matches the Phase 07 decision package and avoids hidden truth drift.

### Pattern 2: Separate runtime core from domain helpers

Create a substrate layer that owns:

- planning-root discovery
- config loading and canonical merge rules
- phase identity and typed phase resolution
- active workstream resolution
- structured-state file IO and validation

Leave domain-specific logic in existing helpers:

- review requirement policy
- artifact path selection
- workflow-stage lists
- command-specific recommendations

This avoids one giant helper module while still consolidating the duplicated low-level logic.

### Pattern 3: Canonical config layering

The config merge order should be:

1. hardcoded safe defaults from runtime code
2. `.planning/config.json`
3. `.planning/state/phase-records/{phase}.json` workflow overrides
4. explicit CLI/runtime overrides passed by the calling command

Important rule:

- aliases from old GSD or Auto configs may be read only at the adapter edge, then normalized into the canonical lowercase dotted-key model before downstream logic uses them

Phase 07 does not need to implement every alias, but it should create one place where alias-to-canonical normalization can live.

### Pattern 4: Structured family writers should be explicit and idempotent

For the first state families, recommended record responsibilities are:

#### `phase-records/{phase}.json`

- phase id and phase type
- status
- current lifecycle subposition
- key artifact pointers
- config overrides for that phase
- verification and review freshness summary fields only where already accepted

#### `workstreams/{id}.json`

- workstream identity
- `primary` special semantics
- status
- lineage and fork metadata
- active pointer metadata

#### `sessions/{session}.json`

- session identity
- current phase/workstream linkage
- pause/resume pointers
- handoff summary pointers

Phase 07 should land safe readers and writers for these families even if not every lifecycle command writes them yet.

### Pattern 5: Adapter migration should preserve public bridge semantics

Current bridge-ready commands should keep:

- existing public names
- existing phase-local artifact names
- current honest-stop behavior
- current downstream recommendations where already accepted

Migration target:

- replace duplicated resolver/state plumbing under those commands
- do not redesign each workflow's artifact contract during substrate work

This is essential to respect the minimal-modification rule.

## Do Not Hand-Roll

Avoid these patterns during Phase 07:

- a second config parser embedded in each helper
- direct regex-based mutation of `STATE.md` as authoritative truth
- silent auto-backfill from fallback reads into structured state
- creating new top-level state roots outside `.planning/state/`
- deleting Auto workflow artifacts because structured state exists
- deleting GSD lifecycle patterns because Auto has similar concepts
- inventing a new "workspace" truth model for `primary` that ignores accepted workstream semantics

## Common Pitfalls

### Pitfall 1: Moving too much lifecycle meaning into Phase 07

If Phase 07 tries to implement `discuss-phase`, `plan-phase`, `execute-phase`, or `next` behavior in full, it will become an uncontrolled Phase 08 spillover.

Guardrail:

- Phase 07 provides runtime substrate and migration hooks only.

### Pitfall 2: Keeping markdown as the real truth forever

If the new helpers still primarily read `STATE.md` and only optionally peek at `.planning/state`, the project will preserve the same drift that stock GSD has today.

Guardrail:

- structured state must win whenever it exists.

### Pitfall 3: Over-eager migration writes

If fallback reads automatically backfill structured state, Phase 07 will hide conflicts and create hard-to-debug truth drift.

Guardrail:

- fallback reads are read-only in this phase.

### Pitfall 4: Breaking Auto semantics while "integrating"

If the substrate migration renames or deletes accepted Auto artifacts and workflow stages too early, later workflow completion will drift from the already accepted public-surface plan.

Guardrail:

- preserve current artifact and stage semantics; only move the underlying resolution/state plumbing.

### Pitfall 5: Repeating resolver logic in every helper

The repository already shows this drift:

- many `ljx-*` helpers call `findPlanningDir`
- many parse `STATE.md`
- many call `resolvePhaseDir`

If Phase 07 does not absorb this into one shared layer, later phases will repeat the same cleanup under more pressure.

## Concrete Recommendations For Planning

### Plan 07-01

Deliver:

- one new shared runtime core module
- canonical config merge helpers
- canonical typed phase and active workstream resolvers
- substrate-focused tests

Do not yet migrate every helper in this plan. Establish the stable substrate first.

### Plan 07-02

Deliver:

- authoritative structured-state IO for `phase-records`, `sessions`, and `workstreams`
- schema-safe record initialization
- `new-project` seeding for the first core families
- workstream/runtime reads that prefer structured state

### Plan 07-03

Deliver:

- helper migration onto the substrate
- one shared phase-context adapter for bridge helpers if needed
- regression coverage proving artifact contracts stay stable while plumbing changes underneath

## Suggested File Boundaries

Recommended new modules:

- `bin/lib/ljx-runtime-core.cjs`
- `bin/lib/ljx-runtime-state.cjs`
- optionally `bin/lib/ljx-phase-context.cjs` for bridge-helper consumers

Recommended tests:

- `tests/runtime-core.test.cjs`
- `tests/runtime-state.test.cjs`
- selected updates to existing bridge test files instead of rewriting the bridge helpers blindly

## Code Examples To Follow

### Reuse from GSD

- `findProjectRoot`, `loadConfig`, and phase lookup patterns in `~/.codex/get-shit-done/bin/lib/core.cjs`
- structured init payload shaping in `~/.codex/get-shit-done/bin/lib/init.cjs`

### Reuse from current repo

- phase-type and summary parsing in `bin/lib/ljx-bridge-contract.cjs`
- honest-stop error packaging in `bin/lib/ljx-state-tools.cjs`
- initial structured state creation in `bin/lib/ljx-new-project-tools.cjs`

### Preserve from Auto

- durable workflow artifacts and recovery state described in:
  - `~/.codex/skills/idea-discovery/SKILL.md`
  - `~/.codex/skills/research-refine/SKILL.md`
  - `~/.codex/skills/auto-review-loop/SKILL.md`
  - `~/.codex/skills/research-pipeline/SKILL.md`
  - `~/.codex/skills/paper-writing/SKILL.md`

## Final Recommendation

Treat Phase 07 as the substrate phase that makes later correctness possible.

Success is not:

- more bridge helpers
- broader fallback heuristics
- a rewritten lifecycle shell

Success is:

- one shared runtime core
- one authoritative structured-state IO layer for the first core families
- current bridge-ready commands consuming that substrate without losing GSD discipline or Auto workflow semantics

---

*Research completed: 2026-04-10*  
*Next step: write executable plans `07-01`, `07-02`, and `07-03`*
