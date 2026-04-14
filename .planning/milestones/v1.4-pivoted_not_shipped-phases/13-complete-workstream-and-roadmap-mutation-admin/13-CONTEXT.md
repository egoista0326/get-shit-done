# Phase 13: Workstream And Roadmap Mutation Admin - Context

**Gathered:** 2026-04-11
**Status:** Ready for research and planning
**Mode:** Auto-selected recommended path: stay closest to GSD roadmap/workstream semantics, preserve GSD and Auto capabilities, and apply the minimal-modification rule.

## Phase Boundary

This phase completes the admin mutation slice that was intentionally deferred while the lifecycle, research, evidence, claim, paper, and rebuttal flows were stabilized.

This phase is responsible for:

- promoting `ljx-GSD-workstreams` beyond the read-only `list/status/progress` bridge slice so `create`, `switch`, `complete`, and `resume` become safe real operations
- promoting `ljx-GSD-add-phase`, `ljx-GSD-insert-phase`, and `ljx-GSD-remove-phase` from deferred manifest entries into bridge-ready typed roadmap mutation commands
- keeping the accepted `primary` mainline semantics: `primary` is visible and switchable, but not completable, removable, renameable, or archived like a normal workstream
- writing authoritative structured records under `.planning/state/workstreams/` and `.planning/state/phase-records/` while keeping `.planning/ROADMAP.md`, `.planning/STATE.md`, and phase directories consistent
- updating generated skill wording, preview/install manifest truth, runtime helper copies, docs, and regression tests together

This phase is not responsible for:

- implementing physical worktree/workspace isolation; that remains a heavier workspace capability, not `workstreams`
- implementing full migration import/cutover, suggested-branch promotion, or end-to-end `research-pipeline` parity; that remains Phase 14
- silently applying review-derived strategic pivots, extra phases, or destructive roadmap changes in `safe` mode without explicit user confirmation or an explicit helper flag
- rewriting completed phase history or using `remove-phase` as a general history-rewrite tool
- replacing the original GSD roadmap commands wholesale when a small typed bridge layer can reuse their numbering, directory, and roadmap-update patterns

## Locked Inbound Decisions

- **D-01:** GSD remains the outer control plane and `.planning/` remains the authoritative root.
- **D-02:** Auto research workflows stay integrated inside GSD; Phase 13 admin commands must not delete or narrow Auto research skill content.
- **D-03:** Minimal modification means reusing established GSD semantics and current shared ljx-GSD helpers wherever practical, not only preserving names.
- **D-04:** `phase` owns sequential mainline work, `workstream` owns logical parallel branches in the same code/workspace reality, and `workspace` owns physical isolation.
- **D-05:** `primary` remains rooted at root `.planning/` and may also have a structured workstream identity record; do not create a mirrored `.planning/workstreams/primary/` tree.
- **D-06:** `switch primary` only returns the active pointer to the root mainline. It does not copy files, import state, or merge a secondary branch.
- **D-07:** Workstream-to-primary return is not a generic merge. Valuable outputs must be adopted/imported as bounded phases, plans, claims, paper artifacts, or other explicit objects.
- **D-08:** Phase-chain mutation in `safe` mode must remain explicit. Review-loop, claim-gate, and pipeline suggestions may propose roadmap changes, but Phase 13 helpers should require direct invocation or explicit confirmation before mutating.

## Implementation Decisions

### Workstream mutation

- **D-09:** `ljx-GSD-workstreams create <name>` should create a structured secondary workstream record and a minimal branch-local planning surface only if needed for honest progress/resume behavior.
- **D-10:** Workstream names must be safe path/record identifiers. Reject names with path separators, traversal, empty values, `primary` for creation, or collisions with existing workstream records/directories.
- **D-11:** `switch <name>` should update one accepted active-workstream pointer source and structured session/workstream metadata; it must not create or move physical workspaces.
- **D-12:** `resume <name>` should make the requested workstream active and recommend or surface the next lifecycle action for that branch without claiming it already ran.
- **D-13:** `complete <name>` should mark a mutable secondary workstream as completed/archived in structured state and should refuse `primary`, missing workstreams, or already completed workstreams with a clear stop reason.
- **D-14:** If legacy `.planning/workstreams/<name>/` directories already exist, preserve read compatibility. Prefer structured records for new writes, and avoid deleting legacy directories unless a later migration phase explicitly handles archival cleanup.

### Roadmap mutation

- **D-15:** `ljx-GSD-add-phase` should add the next integer phase at the end of the active roadmap, require or infer a valid `phase_type`, create the phase directory, and write a structured phase record.
- **D-16:** `ljx-GSD-insert-phase <after> <description>` should add the next available decimal phase after the anchor without renumbering existing phases.
- **D-17:** `ljx-GSD-remove-phase <phase>` should normally remove only unstarted future phases. Active, completed, or evidence-bearing phases must stop unless an explicit future repair/admin mode is later designed.
- **D-18:** Roadmap mutation must keep the summary checklist, progress table, phase detail section, phase directory, and structured phase record aligned.
- **D-19:** Phase creation should prefer explicit `--type <phase_type>`. If missing, a narrow inference fallback may be used only when it is deterministic and surfaced in the result; otherwise stop with `missing_phase_type`.
- **D-20:** `remove-phase` should not silently renumber completed history in this bridge slice. If renumbering later phases is necessary, keep it limited to unstarted future phases and test directory, file, roadmap, and phase-record alignment together.

### Shared helper and install surface

- **D-21:** Add a small shared admin mutation helper only if it centralizes parsing, phase-type validation, safe slugging, roadmap mutation, or state-record updates across the four commands.
- **D-22:** Keep generated skills thin and helper-driven: context/parse first, stop on blockers, then run explicit helper writer commands rather than hand-editing `.planning/` directly from skill prose.
- **D-23:** Promote deferred manifest entries only after runtime helper behavior and generated skill wording have tests proving the command is genuinely bridge-ready.
- **D-24:** Keep `research-pipeline` deferred until Phase 14; do not hide Phase 13 roadmap mutation under the umbrella pipeline name.

### the agent's Discretion

- Exact JSON fields for secondary workstream records, provided `primary` semantics and active pointer behavior remain clear.
- Whether the active pointer is stored as a legacy `.planning/active-workstream` file, a structured session record, or both, provided `resolveActiveWorkstream()` and `workstreams` agree and tests prevent split-brain behavior.
- Exact phase-record metadata fields for newly added/inserted phases, provided `phase_id`, `phase_type`, directory path, lifecycle status, and creation provenance are recorded.
- Exact command argument names beyond the accepted `--type` and phase/name forms, provided generated skill wording and tests match the helper parser.

## Specific Ideas

- Start from the existing read-only workstream helper:
  - `bin/lib/ljx-workstreams-tools.cjs`
  - `tests/workstreams-bridge.test.cjs`
  - `bin/lib/codex-conversion.cjs` generated `ljx-GSD-workstreams` wording
- Start from the existing shared runtime/state helpers:
  - `bin/lib/ljx-runtime-core.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-bridge-contract.cjs`
- Use GSD as implementation reference for roadmap edits:
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/add-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/insert-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/remove-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/roadmap.cjs`
- Tests should cover at least:
  - workstream create/switch/resume/complete happy paths
  - refusal to mutate `primary` destructively
  - stale or conflicting active pointer behavior
  - malformed `.planning/state/workstreams` handling
  - add-phase with explicit type creates roadmap entry, phase directory, and phase record
  - insert-phase chooses decimal slot without renumbering existing phases
  - remove-phase rejects active/completed/evidence-bearing phases
  - generated skills no longer describe these commands as deferred after promotion
  - preview install includes the newly bridge-ready skills and copies required runtime helpers

## Canonical References

**Downstream agents MUST read these before researching, planning, or implementing.**

### Phase and project contracts

- `.planning/ROADMAP.md` - Phase 13 goal, plan slots, dependencies, and success criteria.
- `.planning/REQUIREMENTS.md` - `IMPL-07` and related mutation/admin requirements.
- `.planning/PROJECT.md` - project-level GSD/Auto preservation, reuse, and minimal-modification guardrails.
- `.planning/STATE.md` - current position, remaining risks, and Phase 12 review-gate caveat.
- `.planning/IMPLEMENTATION-LESSONS.md` - lessons about semantic reuse, generated output, malformed paths, and review depth.

### Locked upstream decisions

- `.planning/phases/05-migration-and-parallelism-strategy/05-CONTEXT.md` - workstream/mainline/adoption rules and migration-safe mutation boundaries.
- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` - canonical state-family namespace and `primary` workstream root decision.
- `LJX-GSD-DESIGN-DECISION-LOG.md` - accepted phase/workstream/workspace boundary, `primary`, adoption, and roadmap mutation rules.
- `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` - public contracts for `add-phase`, `insert-phase`, `remove-phase`, and `workstreams`.
- `LJX-GSD-ARCHITECTURE.md` - safe/autonomous roadmap mutation rule and phase/workstream/workspace boundary.
- `LJX-GSD-INTERFACES.md` - phase type visibility and assignment policy for creation commands.
- `LJX-GSD-SKILL-MIGRATION-DETAILED.md` - migration disposition for original GSD admin commands.
- `LJX-GSD-USER-SKILL-GUIDE.md` - current user-facing status: workstream mutation and structural roadmap commands were deferred until this phase.

### Existing implementation references

- `bin/lib/ljx-workstreams-tools.cjs` - current read-only workstream context helper to extend.
- `bin/lib/ljx-runtime-core.cjs` - phase/workstream resolution, active pointer semantics, config, and malformed path helpers.
- `bin/lib/ljx-runtime-state.cjs` - structured state read/write helpers and accepted state family registry.
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` - generated skill and install surfaces that must remain aligned with runtime truth.
- `bin/lib/manifest.cjs` - deferred/bridge-ready manifest truth for the Phase 13 commands.
- `tests/workstreams-bridge.test.cjs` - current read-only coverage to expand.
- `tests/runtime-state.test.cjs` - structured state helper coverage.
- `tests/skill-build.test.cjs` - generated skill, manifest, install, and preserved asset coverage.

### GSD implementation references

- `/Users/lijiaxin/.codex/get-shit-done/workflows/add-phase.md` - original phase-add workflow semantics.
- `/Users/lijiaxin/.codex/get-shit-done/workflows/insert-phase.md` - original decimal insertion workflow semantics.
- `/Users/lijiaxin/.codex/get-shit-done/workflows/remove-phase.md` - original future-phase removal workflow semantics and anti-patterns.
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/roadmap.cjs` - original roadmap parsing/update utility patterns.

## Existing Code Insights

### Reusable assets

- `readWorkstreamsContext()` already centralizes planning detection, primary-first listing, structured workstream preference, legacy directory discovery, and stale active-pointer surfacing.
- `resolveActiveWorkstream()` already owns active pointer interpretation; Phase 13 should extend or reuse it instead of inventing a second active-pointer parser.
- `ensurePrimaryWorkstreamRecord()` already seeds the accepted `primary` shape and should remain the source of `primary` metadata defaults.
- `resolvePhaseSelection()` and state-record helpers already handle typed phase IDs and malformed `.planning/phases` / `.planning/state` paths.

### Established patterns to preserve

- Context reads should not mutate `.planning/state`.
- Mutations should go through explicit helper commands.
- Generated skill wording must name the helper command and not instruct direct `.planning/state` writes.
- Build/install manifest truth must match whether a command is bridge-ready or deferred.
- Tests should cover generated skill text and preview install output, not only helper return values.

### Integration points

- If new runtime helper files are introduced, update `build-skills.cjs` runtime copy list and `tests/skill-build.test.cjs`.
- If `manifest.cjs` promotes deferred commands, update user guide and docs contract tests so they do not keep describing those commands as deferred.
- If roadmap mutation writes `ROADMAP.md`, pair tests with `resolveNextAction()` or `resolvePhaseSelection()` checks so the new phase is actually routable.
- If workstream mutation writes an active pointer, pair tests with `readWorkstreamsContext()` and `resolveActiveWorkstream()` to prevent split-brain behavior.

## Deferred Ideas

- Full migration import/cutover, suggested-branch promotion, and end-to-end `research-pipeline` parity remain Phase 14.
- Physical workspace/worktree orchestration remains a separate workspace capability, not Phase 13 workstream mutation.
- Generic whole-workstream merge-back into `primary` remains out of scope; use bounded adopt/import proposals instead.
- Rich UI or TUI management for roadmap/workstream admin remains out of scope for this CLI/helper bridge slice.

---

*Phase: 13-complete-workstream-and-roadmap-mutation-admin*
*Context gathered: 2026-04-11*
